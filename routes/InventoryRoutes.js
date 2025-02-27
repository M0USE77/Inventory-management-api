const express = require('express');
const {getInventory, createInventory, deleteInventory, updateInventory, getInventoryByID } = require('../Controllers/InventoryController');

//router object
const router = express.Router();

//routes

// GET ALL Inventory LIST || GET
router.get('/getallInventory', getInventory);

// GET Inventory BY ID
router.get('/get/:id', getInventoryByID);

// CREATE Inventory || POST
router.post('/createInventory', createInventory);

// UPDATE Inventory || PUT
router.put('/updateInventory/:id', updateInventory);

// DELETE Inventory || DELETE
router.delete('/deleteInventory/:id', deleteInventory);

module.exports = router;