import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({ message: "user already exist" });
    }

    const user = await User.create({ email, name, password });
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        password: user.password,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(201).json({ token, email: user.email });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        password: user.password,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    console.log("req user of auth contoleer login", req.user);
    // res.setHeader("Set-cookie", "isLoggedIn=tru=/;");
    // .render("/")
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // prevents JavaScript access
        secure: true, // set to true if using HTTPS
        sameSite: "none", // or 'Strict' or 'None' for cross-site
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
