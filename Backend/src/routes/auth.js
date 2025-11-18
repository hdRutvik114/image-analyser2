import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import multer from "multer";
const router = express.Router();
import { uploadimage,generatecaption,qrcode_decoder } from "../controllers/controllers.js";
import uploadw from "../uploads/upload.js";

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();
    console.log(newUser.password)
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // ⭐ Create JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

     // ⭐ Set HttpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // true in production
    sameSite: "lax"
  });
     
    res.status(200).json({ message: "Login successful", user: email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload",upload.single('image'),uploadimage);
router.post("/caption",upload.single('image'),generatecaption);
router.post("/qrcode",upload.single('image'),qrcode_decoder);


export default router;
