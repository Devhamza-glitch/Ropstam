import User from "../model/UserModel.js";
import {
  hashPassword,
  comparePassword,
} from "../middleware/EncryptionUtilis.js";
import { generateAuthToken } from "../middleware/JwtUtilis.js";
import { sendEmail } from "../middleware/EmailUtilis.js";

export const createUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-6) + "a" + 23;
      const hashedPassword = await hashPassword(randomPassword);
      await sendEmail(req.body.email, randomPassword);
      const userCreated = await User.create({
        ...req.body,
        password: hashedPassword,
      });
      userCreated.password = "";
      const token = await generateAuthToken(userCreated);
      if (userCreated) {
        res.status(200).send({
          success: true,
          message: `Acoount created with ${req.body.email} successfully`,
          data: { user: userCreated, token: token },
        });
      }
      res.status(400).send({
        success: false,
        message: "Something went wrong. Please try again later",
      });
    }
    res.status(400).send({
      success: false,
      message: "Email already exists.Please try another one",
    });
  } catch (error) {
    res.status(503).send({ success: false, message: "Internal Server Error." });
  }
};

export const loginUser = async (req) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const checkPassword = await comparePassword(
        req.body.password,
        user.password
      );
      if (checkPassword) {
        const token = await generateAuthToken(user);
        res.status(200).send({
          success: true,
          message: "Logged in successfully",
          data: { user: user, token: token },
        });
      }
      res.status(400).send({ success: false, message: "Incorrect password" });
    }
    res.status(400).send({ success: false, message: "Incorrect email" });
  } catch (error) {
    res.status(503).send({ success: false, message: "Internal Server Error." });
  }
};
