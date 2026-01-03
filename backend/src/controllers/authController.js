import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;
export const signUp = async (req, res) => {
  try {
    const { userName, password, email, firstName, lastName } = req.body;
    if (!userName || !password || !email || !firstName || !lastName) {
      return res.status(400).json({
        message: "username, password, email, firstname, lastname are required",
      });
    }

    // check if userName exists
    const duplicate = await User.findOne({ userName });

    if (duplicate) {
      return res.status(409).json({ message: "userName already exists" });
    }

    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds => more secure

    //creat user
    await User.create({
      userName,
      hashedPassword,
      email,
      displayName: `${firstName} ${lastName}`,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("error when call signUp", error);
    return res.status(500).json({ message: "system error" });
  }
};

export const signIn = async (req, res) => {
  try {
    // get input
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "userName and password are required" });
    }

    //get hashPass in db and compare to input password
    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(401)
        .json({ message: "username or password are not correct!" });
    }
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ message: "username or password are not correct" });
    }
    // if equal, create accessToken with jwt
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    //create refresh accessToken
    const refreshToken = crypto.randomBytes(64).toString("hex");
    //create session to save refresh accessToken
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });
    //return refreshToken to cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // prevent client-side script access
      secure: true, // only send cookie over HTTPS
      sameSite: "none", // allow cross-site requests
      maxAge: REFRESH_TOKEN_TTL, // cookie expiration time
    });
    // return accessToken to res
    return res
      .status(200)
      .json({ message: `User ${user.displayName} logged in.`, accessToken });
  } catch (error) {
    console.log("error when call signIn", error);
    return res.status(500).json({ message: "system error" });
  }
};

export const signOut = async (req, res) => {
  try {
    //get refreshToken from cookie
    const token = req.cookies?.refreshToken;

    if (token) {
      //delete refreshToken in session
      await Session.deleteOne({ refreshToken: token });
      //delete cookie
      res.clearCookie("refreshToken");
    }
    return res.sendStatus(204);
  } catch (error) {
    console.log("error when call signOut", error);
    return res.status(500).json({ message: "system error" });
  }
};
