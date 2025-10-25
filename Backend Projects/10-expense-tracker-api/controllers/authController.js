const User = require('../model/UserETAPI');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'name, email and password are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPwd });

    const accessToken = jwt.sign(
      { uID: newUser._id, em: newUser.email },
      process.env.ACCESSS_TOKEN_SECRET,
      { expiresIn: '15m', issuer: 'thesigan' }
    );

    res
      .status(201)
      .json({ message: 'User registered successfully', token: accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !bcrypt.compare(password, user.password))
      return res.status(401).json({ message: 'Invalid username or password' });

    const accessToken = jwt.sign(
      { uID: user._id, em: user.email },
      process.env.ACCESSS_TOKEN_SECRET,
      { expiresIn: '15m', issuer: 'thesigan' }
    );

    res
      .status(200)
      .json({ message: 'User logged in successfully', token: accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };
