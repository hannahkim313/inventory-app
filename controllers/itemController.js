const { body, validationResult } = require('express-validator');

const Item = require('../models/item');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');

// Display home page
exports.index = asyncHandler(async (req, res, next) => {
  // Fetch information about how many Item and Category records are in the database
  const [numItems, numCategories] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render('index', {
    title: 'Home',
    item_count: numItems,
    category_count: numCategories,
  });
});

// Display list of all items
exports.item_list = asyncHandler(async (req, res, next) => {
  // Fetch all Item records
  const allItems = await Item.find({})
    .sort({ name: 1 })
    .populate('category')
    .exec();

  res.render('item_list', {
    title: 'All Items',
    item_list: allItems,
  });
});

// Display detail page for a specific item
exports.item_detail = asyncHandler(async (req, res, next) => {
  // Fetch details of a specific item
  const item = await Item.findOne({ name: req.params.name })
    .populate('category')
    .exec();

  if (item === null) {
    const err = new Error('Item not found');
    err.status = 404;

    return next(err);
  }

  res.render('item_detail', {
    title: 'Item Detail',
    item,
  });
});

// Display item create form on GET
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).sort({ name: 1 }).exec();

  res.render('item_form', {
    title: 'Create Item',
    item: undefined,
    categories,
    errors: [],
  });
});

// Handle item create on POST
exports.item_create_post = [
  // Validate and sanitize fields
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name field is required.')
    .isLength({ max: 100 })
    .withMessage('Name must contain less than 100 characters.')
    .escape(),
  body('brand')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Brand field is required.')
    .escape(),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description field is required.')
    .isLength({ max: 300 })
    .withMessage('Description must contain less than 300 characters.')
    .escape(),
  body('category', 'Category field is required.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('size').optional({ values: 'falsy' }).escape(),
  body('price')
    .trim()
    .isFloat({ min: 0 })
    .withMessage('Price field requires a non-negative floating-point number.')
    .isCurrency({
      allow_decimal: true,
      digits_after_decimal: [2],
    })
    .withMessage('Price field must follow this format: 1 or 1.00.')
    .escape(),
  body('num_in_stock')
    .trim()
    .isNumeric({ no_symbols: true })
    .withMessage('Number in stock field must not contain symbols.')
    .isInt({ min: 0 })
    .withMessage('Number in stock field must only contain integers.')
    .escape(),

  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from request
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      category: req.body.category,
      size: req.body.size,
      price: req.body.price,
      num_in_stock: req.body.num_in_stock,
    });

    if (!errors.isEmpty()) {
      console.log(errors.array());
      const allCategories = await Category.find({}).sort({ name: 1 }).exec();

      res.render('item_form', {
        title: 'Create Item',
        item,
        categories: allCategories,
        errors: errors.array(),
      });

      return;
    } else {
      const itemExists = await Item.findOne({ name: req.body.name })
        .collation({ locale: 'en', strength: 2 })
        .exec();

      if (itemExists) {
        res.redirect(itemExists.url);
      } else {
        if (req.body.size === '') {
          item.size = 'N/A';
        }

        await item.save();

        res.redirect(item.url);
      }
    }
  }),
];

// Display item delete form on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findOne({ name: req.params.name });

  if (item === null) {
    res.redirect('/catalog/items');
  }

  res.render('item_delete', {
    title: 'Delete Item',
    item,
  });
});

// Handle item delete on POST
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findOneAndDelete({ name: req.body.item_name });

  res.redirect('/catalog/items');
});

// Display item update form on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item update GET');
});

// Handle item update on POST
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item update POST');
});
