// User sign up and login gowa here

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');


router.get('/signup', ctrl.auth.renderSignup)
router.post('/signup', ctrl.auth.createUser)
router.get('/login', ctrl.auth.renderLogin)
router.post('/login', ctrl.auth.checkUser)




module.exports = router;