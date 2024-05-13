const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController');

// 'Item' routes //

// GET catalog home page
router.get('/', itemController.index);

// GET request to create an item
router.get('/item/create', itemController.item_create_get);

// POST request to create an item
router.post('/item/create', itemController.item_create_post);

// GET request to delete an item
router.get('/item/:name/delete', itemController.item_delete_get);

// POST request to delete an item
router.post('/item/:name/delete', itemController.item_delete_post);

// GET request to update an item
router.get('/item/:name/update', itemController.item_update_get);

// POST request to update an item
router.post('/item/:name:/update', itemController.item_update_post);

// GET request to display a specific item's detail page
router.get('/item/:name', itemController.item_detail);

// GET request to list all items
router.get('/items', itemController.item_list);

// 'Category' routes //

// GET request to create a category
router.get('/category/create', categoryController.category_create_get);

// POST request to create a category
router.post('/category/create', categoryController.category_create_post);

// GET request to delete a category
router.get('/category/:name/delete', categoryController.category_delete_get);

// POST request to delete a category
router.post('/category/:name/delete', categoryController.category_delete_post);

// GET request to update a category
router.get('/category/:name/update', categoryController.category_update_get);

// POST request to update a category
router.post('/category/:name:/update', categoryController.category_update_post);

// GET request to display a specific category's detail page
router.get('/category/:name', categoryController.category_detail);

// GET request to list all categories
router.get('/categories', categoryController.category_list);

module.exports = router;
