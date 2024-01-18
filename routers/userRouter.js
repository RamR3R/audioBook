const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/userController.js');
const authenticateUser = require('../middleware/auth.js');

userRouter.post('/register', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);
userRouter.post('/addfav', authenticateUser,UserController.addFav);
userRouter.post('/removefav',authenticateUser, UserController.removeFav);
userRouter.get('/userdetails',authenticateUser,UserController.userDetails)

module.exports = userRouter;