require("dotenv").config();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cart = require("../model/Cart");
const { render } = require("ejs");

const registerUser = async (req, res, next) => {
  try {
    let isAdmin = false;
    let newUser;
    const { userName, email, name, password } = req.body;
    if (!userName || !email || !name || !password) {
      /*       return res
        .status(400)
        .json({ message: "userName, email, name and password are required" });  */

      return res.render("alert", {
        title: "Missing Fields",
        message: "All fields are required",
        details: "userName, email, name and password are required",
        type: "error",
        statusCode: 400,
        redirectUrl: "/auth/register",
        redirectDelay: 3,
      });
    }

    if (req.body.adminPassword) {
      if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
        /* return res.status(403).json({ message: "Invalid admin password" }); */
        return res.render("alert", {
          title: "Access Denied",
          message: "Invalid admin password",
          details: "You do not have permission to register as admin",
          type: "error",
          statusCode: 403,
          redirectUrl: "/auth/register",
          redirectDelay: 3,
        });
      } else {
        isAdmin = true;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      /* return res.status(400).json({ message: "Invalid email format" }); */
      return res.render("alert", {
        title: "Invalid Email",
        message: "Please enter a valid email address",
        details: "The email format is incorrect",
        type: "error",
        statusCode: 400,
        redirectUrl: "/auth/register",
        redirectDelay: 3,
      });
    }
    const emailExists = await User.findOne({ email }).exec();
    if (emailExists) {
      /* return res.status(409).json({ message: "Email already in use" }); */
      return res.render("alert", {
        title: "Email Taken",
        message: "This email is already registered",
        details: "Please use a different email address",
        type: "error",
        statusCode: 409,
        redirectUrl: "/auth/register",
        redirectDelay: 3,
      });
    }
    const userNameExists = await User.findOne({ userName }).exec();
    if (userNameExists) {
      /* return res.status(409).json({ message: "Username already in use" }); */
      return res.render("alert", {
        title: "Username Taken",
        message: "This username is already in use",
        details: "Please choose a different username",
        type: "error",
        statusCode: 409,
        redirectUrl: "/auth/register",
        redirectDelay: 3,
      });
    }
    if (password.length < 6) {
      /* return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" }); */
      return res.render("alert", {
        title: "Weak Password",
        message: "Password is too short",
        details: "Password must be at least 6 characters long",
        type: "error",
        statusCode: 400,
        redirectUrl: "/auth/register",
        redirectDelay: 3,
      });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    if (isAdmin) {
      newUser = await User.create({
        userName,
        email,
        name,
        password: hashedPwd,
        isAdmin,
      });
    } else {
      newUser = await User.create({
        userName,
        email,
        name,
        password: hashedPwd,
      });
      await Cart.create({ userId: newUser._id, products: [] });
      console.log(
        `Created cart for user: ${newUser.email} (${newUser.userName})`
      );
    }

    const accessToken = jwt.sign(
      { uID: newUser._id, em: newUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m", issuer: "thesigan" }
    );

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      /* secure: true, */ sameSite: "None",
      maxAge: 15 * 60 * 1000,
    });
    console.log(`Registering user: ${userName}, ${email}, ${name}`);
    /* return res.status(201).json({ message: 'User registered successfully' }); */
    return res.render("alert", {
      title: "Registration Successful",
      message: `${isAdmin ? "Admin" : "User"} registered successfully`,
      details: `Welcome ${userName}!`,
      type: "success",
      statusCode: 201,
      redirectUrl: "/",
      redirectDelay: 3,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      /* return res
        .status(400)
        .json({ message: "Email and password are required" }); */
      return res.render("alert", {
        title: "Missing Credentials",
        message: "Email and password are required",
        details: "Please fill in both fields",
        type: "error",
        statusCode: 400,
        redirectUrl: "/auth",
        redirectDelay: 3,
      });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      /* return res.status(401).json({ message: "Invalid email or password" }); */
      return res.render("alert", {
        title: "Login Failed",
        message: "Invalid email or password",
        details: "Please check your credentials and try again",
        type: "error",
        statusCode: 401,
        redirectUrl: "/auth",
        redirectDelay: 3,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      /* return res.status(401).json({ message: "Invalid email or password" }); */
      return res.render("alert", {
        title: "Login Failed",
        message: "Invalid email or password",
        details: "Please check your credentials and try again",
        type: "error",
        statusCode: 401,
        redirectUrl: "/auth",
        redirectDelay: 3,
      });
    }

    const accessToken = jwt.sign(
      { uID: user._id, em: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m", issuer: "thesigan" }
    );

    console.log(
      `User logged in: ${user.userName}, ${user.email}, ${user.name}`
    );
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 15 * 60 * 1000,
    });
    /* return res.status(200).json({ message: 'Login successful' }); */
    return res.render("alert", {
      title: "Login Successful",
      message: `${user.isAdmin ? "Admin" : "User"} logged in successfully`,
      details: `Welcome ${user.userName}!`,
      type: "success",
      statusCode: 200,
      redirectUrl: "/products",
      redirectDelay: 1,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOne({ userName }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isAdmin) {
      return res.status(403).json({ message: "Admin cannot be deleted" });
    }
    await User.deleteOne({ userName });
    await Cart.deleteOne({ userId: user._id });
    /* return res.status(200).json({ message: "User deleted successfully" }); */
    return res.render("alert", {
      title: "Delete Successful",
      message: "User deleted successfully",
      details: `Goodbye ${user.userName}!`,
      type: "success",
      statusCode: 200,
      redirectUrl: "/users",
      redirectDelay: 1,
    });
  } catch (err) {
    next(err);
  }
};

const showUsers = async (req, res, next) => {
  try {
    const users = await User.find().exec();
    /* return res.status(200).json({ users }); */
    return res.render("admin/users", { users });
  } catch (err) {
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.redirect("/auth");
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser, deleteUser, showUsers, logoutUser };
