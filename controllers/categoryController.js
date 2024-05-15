const { body, validationResult } = require('express-validator');

const Category = require('../models/category');
const Item = require('../models/item');

const asyncHandler = require('express-async-handler');

// Display list of all categories
exports.category_list = asyncHandler(async (req, res, next) => {
  // Fetch all Category records
  const allCategories = await Category.find({}, 'name')
    .sort({ name: 1 })
    .exec();

  res.render('category_list', {
    title: 'All Categories',
    category_list: allCategories,
  });
});

// Display detail page for a specific category
exports.category_detail = asyncHandler(async (req, res, next) => {
  // Fetch details of a specific category and all Item records within that category
  const category = await Category.findOne({ name: req.params.name }).exec();
  const itemsInCategory = await Item.find({ category }).exec();

  if (category === null) {
    const err = new Error('Category not found');
    err.status = 404;

    return next(err);
  }

  res.render('category_detail', {
    title: 'Category Detail',
    category,
    category_items: itemsInCategory,
  });
});

// Display category create form on GET
exports.category_create_get = (req, res, next) => {
  res.render('category_form', {
    title: 'Create Category',
    category: undefined,
    errors: [],
  });
};

// Handle category create on POST
exports.category_create_post = [
  // Validate and sanitize fields
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name field is required.')
    .isLength({ max: 50 })
    .withMessage('Name must contain less than 50 characters.')
    .escape(),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description field is required.')
    .isLength({ max: 300 })
    .withMessage('Description must contain less than 300 characters.')
    .escape(),

  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from request
    const errors = validationResult(req);

    // Create a category object with clean values
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create Category',
        category,
        errors: errors.array(),
      });

      return;
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: 'en', strength: 2 })
        .exec();

      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();

        res.redirect(category.url);
      }
    }
  }),
];

// Display category delete form on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category delete GET');
});

// Handle category delete on POST
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category delete POST');
});

// Display category update form on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category update GET');
});

// Handle category update on POST
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category update POST');
});
