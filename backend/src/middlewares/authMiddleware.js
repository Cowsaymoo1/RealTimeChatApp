import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = (req, res, next) => {
  try {
    //get token from header Authentization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "accessToken not found" });
    }
    // verify token
    jwt.verify(
      token, //token to verify
      process.env.ACCESS_TOKEN_SECRET, //secret key
      async (err, decodedUser) => {
        if (err) {
          console.error(err);
          return res
            .status(403)
            .json({ message: "accessToken expires or not found" });
        }
        //find user in database
        const user = await User.findById(decodedUser.userId).select(
          "-hashedPassword"
        ); //select -hashedPassword to not return hashedPassword

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        // save
        req.user = user; //add user to request object
        next();
      }
    );
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    console.log("error in authenticate middleware", error);
    return res.status(500).json({ message: "Authentication error" });
    1;
  }
};
