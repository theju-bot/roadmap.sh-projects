const User = require('../model/User');
const bcrypt = require('bcrypt');

const verifyUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json({ message: 'Email and password are required' });

  const user = await User.findOne({ email }).exec();
  if (!user || !bcrypt.compare(password, user.password))
    return res.status(401).json({ message: 'Invalid username or password' });

  res.status(200).json({ token: user.token });
};

module.exports = { verifyUser };
