const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fav : [],
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = generateToken(savedUser);

    res.status(201).json({ token, user: savedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const   loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({ token, message : 'User Logged in Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addFav = async(req,res)=>{
  try{
    let user = await User.findById(req.user.id);
    let userFav = user.fav;
    console.log(userFav);
    userFav.push(req.body.fav);
    console.log(userFav);
    await User.findByIdAndUpdate(req.user.id,{fav: userFav});
    res.status(201).json({message : "Added to Favourites"});
  }
  catch(err)
  {
    res.status(400).json({message:err.message});
  }
}

const removeFav = async(req,res)=>{
  try{
    let user = await User.findById(req.user.id);
    let userFav = user.fav;
    userFav.splice(userFav.indexOf(req.body.fav),1);
    await User.findByIdAndUpdate(req.user.id , {fav: userFav});
    res.status(204).json({message : "removed from Favourites"});
  }
  catch(err)
  {
    res.status(400).json({message:err.message});
  }
};

const userDetails = async(req,res)=>{
  try{
    let user = await User.findById(req.user.id).populate('fav');
    res.status(200).json({message : "This is User Details of the logged in ID", data : user});
  }
  catch(err)
  {
    res.status(400).json({message:err.message});
  }
};

// Helper function to generate JWT token
const generateToken = (user) => {
  const payload = {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  };

  const secretKey = process.env.secretKey;
  const expiration = '1w';

  return jwt.sign(payload, secretKey, { expiresIn: expiration });
};

module.exports = {
  registerUser,
  loginUser,
  addFav,
  removeFav,
  userDetails
};
