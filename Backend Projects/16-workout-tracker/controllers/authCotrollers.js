const UsersWT = require("../model/UsersWT");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ExerciseWT = require("../model/ExercisesWT");

const userRegister = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "userName & password must be included" });
    }

    const user = await UsersWT.findOne({ userName }).exec();
    if (user) {
      return res.status(409).json({ message: "userName already exists" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await UsersWT.create({ userName, password: hashedPwd });

    return res
      .status(201)
      .json({ message: "User Created Successfully", userDetails: { newUser } });
  } catch (err) {
    next(err);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "userName & password must be included" });
    }

    const user = await UsersWT.findOne({ userName }).exec();
    if (!user) {
      return res
        .status(400)
        .json({ message: "userName not founud in the database" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "password does not match" });
    }

    const exercises = await ExerciseWT.find().exec();

    const accesToken = jwt.sign(
      { uId: user._id, userName: user.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m", issuer: "thesigan" },
    );

    res.cookie("jwt", accesToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 15 * 60 * 1000,
      // secure: true,
    });

    return res.status(200).json({
      message: "User Loggined Successfully",
      userDetails: user,
      exercises,
    });
  } catch (err) {
    next(err);
  }
};

const userLogout = async (req, res, next) => {
  try {
    res
      .clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        // secure: true,
      })
      .status(200)
      .json({ message: "User Logged Out Successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { userRegister, userLogin, userLogout };
