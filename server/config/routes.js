const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/login', userController.login);

router.get('/user/:userId', userController.allowIfLoggedin, userController.getOneUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getAllUsers);

router.put('user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

module.exports = router;