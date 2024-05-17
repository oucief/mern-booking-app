import express, { Request, Response } from "express";
import User from "../models/user";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check(
      "password",
      "password should be at least 6 characters or more"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      const { email, password } = await req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

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

      return res.status(200).json({ message: user._id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "Logged Out" });
});

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  return res.status(200).json({ userId: req.userId });
});

export default router;
