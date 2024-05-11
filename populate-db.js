#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Item = require('./models/item');

const categories = [];
const items = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

const main = async () => {
  console.log('Debug: About to connect');

  await mongoose.connect(mongoDB);

  console.log('Debug: Should be connected?');

  await createAllCategories();
  await createAllItems();

  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
};

main().catch((err) => console.log(err));

const createCategory = async (index, name, description) => {
  const category = new Category({ name, description });

  await category.save();

  categories[index] = category;
  console.log(`Added category: ${name}`);
};

const createItem = async (
  index,
  name,
  brand,
  description,
  category,
  size,
  price,
  num_in_stock
) => {
  const sizeVal = size ? size : 'N/A';
  const item = new Item({
    name,
    brand,
    description,
    category,
    size: sizeVal,
    price,
    num_in_stock,
  });

  await item.save();

  items[index] = item;
  console.log(`Added item: ${name}`);
};

const createAllCategories = async () => {
  console.log('Adding categories');

  await Promise.all([
    createCategory(0, 'Painting', 'Various paint mediums and brushes.'),
    createCategory(1, 'Drawing', 'Pencils, pens, and other drawing tools.'),
    createCategory(2, 'Surfaces', 'Canvases, sketchbooks, journals, and etc.'),
  ]);
};

const createAllItems = async () => {
  console.log('Adding items');

  await Promise.all([
    createItem(
      0,
      'Amsterdam Standard Series Acrylics, Emerald Green',
      'Amsterdam',
      'Vibrant pigments made from 100% acrylic emulsion. Easy to work with on its own or with other painting mediums.',
      categories[0],
      '120 ml',
      7.99,
      15
    ),
    createItem(
      1,
      'Amsterdam Standard Series Acrylics, Red Light',
      'Amsterdam',
      'Vibrant pigments made from 100% acrylic emulsion. Easy to work with on its own or with other painting mediums.',
      categories[0],
      '120 ml',
      7.99,
      12
    ),
    createItem(
      2,
      'Amsterdam Standard Series Acrylics, Golden Yellow',
      'Amsterdam',
      'Vibrant pigments made from 100% acrylic emulsion. Easy to work with on its own or with other painting mediums.',
      categories[0],
      '120 ml',
      7.99,
      16
    ),
    createItem(
      3,
      'Amsterdam Standard Series Acrylics, Brilliant Blue',
      'Amsterdam',
      'Vibrant pigments made from 100% acrylic emulsion. Easy to work with on its own or with other painting mediums.',
      categories[0],
      '120 ml',
      7.99,
      18
    ),
    createItem(
      4,
      "Holbein Artists' Gouache Set",
      'Holbein',
      'Contains 12 colors of 5 ml tubes that provide consistent results. No whitening agents are added to increase opacity.',
      categories[0],
      false,
      75.25,
      8
    ),
    createItem(
      5,
      'Princeton Neptune Professional Series Set',
      'Princeton',
      'The Neptune Series 4750 is one of the softest and water-absorbing synthetic brush set able to deliver a lot of color evenly. Ideal for watercolor. Contains Aquarelle 3/4", Round 4, Round 12, and Oval Wash 1/2".',
      categories[0],
      false,
      71.49,
      4
    ),
    createItem(
      6,
      'Prismacolor Premier Colored Pencils, Set of 36',
      'Prismacolor',
      'Colors include primary hues, mid-tones, grays, neons, and metallics. Resistant to fading and crumbling.',
      categories[1],
      false,
      54.49,
      11
    ),
    createItem(
      7,
      'Staedtler Mars Lumograph Drawing Pencils, Set of 12',
      'Staedtler',
      'Fine quality pencils ideal for drawing, writing, and drafting. Set includes 6B, 5B, 4B, 3B, 2B, B, HB, F, H, 2H, 3H, and 4H.',
      categories[1],
      false,
      24.3,
      13
    ),
    createItem(
      8,
      'Sakura Pigma Micron Set of 3 Assorted Size Black Pens',
      'Sakura',
      'Fine-point pens of waterproof, quick-drying pigmented ink ideal for graphics, drafting, illustration, accounting, and etc. Set includes .25 mm, .35 mm, and .45 mm.',
      categories[1],
      false,
      8.99,
      2
    ),
    createItem(
      9,
      'Strathmore 300 Series Bristol Pads, 9" x 12"',
      'Strathmore',
      '2-ply bristol weight with a vellum surface designed for a broad range of mediums such as crayon, pencil, and charcoal. 20 sheets per pad.',
      categories[2],
      false,
      10.49,
      8
    ),
    createItem(
      9,
      'Strathmore 400 Series Drawing Art Journal, 5" x 8"',
      'Strathmore',
      'Ideal for graphite, colored pencil, charcoal, pen and ink, marker, soft pastel, and oil pastel.',
      categories[2],
      false,
      19.49,
      1
    ),
  ]);
};
