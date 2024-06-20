const express = require("express");
const Menu = require("../models/Menu");
const router = express.Router();
const menuControllers = require('../controllers/menuControllers');

router.get('/', menuControllers.getAllMenuItems);
router.post('/',menuControllers.postMenuItem);
router.delete('/:id',menuControllers.deleteMenuItem);
router.get('/:id',menuControllers.singleMenuItem);
router.patch('/:id',menuControllers.updateMenuItem);

module.exports = router;