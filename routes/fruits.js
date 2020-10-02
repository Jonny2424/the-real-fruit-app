const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');


// Go to the new api in controller
router.get('/new', ctrl.fruits.newFruit)
// Go to the index api in controller
router.get('/', ctrl.fruits.index);
// Go to the addFruit api in controller
router.post('/', ctrl.fruits.addFruit);
// Go to the UpdateFruit api in controller
router.put('/:index', ctrl.fruits.updateFruit);
// Go to the delete api in controller
router.delete('/:index', ctrl.fruits.deleteFruit)
// Go to the show api in controller
router.get('/:index', ctrl.fruits.show);
// Go to the editFruit api in controller;
router.get('/:index/edit', ctrl.fruits.editFruit);

module.exports = router;


