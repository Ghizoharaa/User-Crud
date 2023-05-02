const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController')

// Display all user
router.get('/user', userController.getAllUsers)

//Display the index page
router.get('/', userController.getIndexPage);

// Add user to db
router.post('/signup', userController.addUser);

// Delete user fron db
router.delete('/user/:id', userController.deleteUser);


module.exports = router;
