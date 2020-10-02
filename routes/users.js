const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');


router.get('/profile', ctrl.users.profilePage)
router.put('/profile/:index', ctrl.users.editProfile)
router.delete('/:index', ctrl.users.deleteProfile)

module.exports = router;

