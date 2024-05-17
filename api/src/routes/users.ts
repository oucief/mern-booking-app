import express, { Request, Response } from "express";
import User from "../models/user";
import {check, validationResult} from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/register",
  [
    check("email", "email is required").isEmail(),
    check(
      "password",
      "password should be at least 6 characters or more"
    ).isLength({ min: 6 }),
    check("firstName", "first name is required").isString(),
    check("lastName", "last name is required").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()})
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        return res
          .status(400)
          .json({ message: "User already exists. Try to sign in" });
      }
      user = new User(req.body);
      await user.save();
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({message: "user registered"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);



export default router;
