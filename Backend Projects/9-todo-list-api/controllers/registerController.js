const crypto = require('crypto');  
const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: 'name, email and password are required.' });

  // check for duplicate emails
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPwd,
      token: token,
    });

    res.status(201).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
