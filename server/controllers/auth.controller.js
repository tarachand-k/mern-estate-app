import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // CHECK IF USERNAME EXISTS
    const user = await prisma.user.findUnique({
      where: { username, email },
    });

    if (user)
      return res
        .status(401)
        .json({ success: false, message: "User already exists!" });

    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE A NEW USER AND SAVE INTO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // CHECK IF USERNAME EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials!" });

    // CHECK IF PASSWORD IS CORRECT
    const isPasswdCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswdCorrect)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials!" });

    // GENERATE COOKIT TOKEN AND SENT TO THE USER
    // res.setHeader("Set-Cookie", "test=" + "myValue");

    const expiresOn = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        // isAdmin: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: expiresOn,
      }
    );

    const { password: userPasswd, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true,
        maxAge: expiresOn,
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully!",
        user: userInfo,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to log in" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "Logged out successfully!" });
};
