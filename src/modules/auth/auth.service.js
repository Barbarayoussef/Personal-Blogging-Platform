import userModel from "../../database/models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  let { name, email, password, confirmPassword } = req.body;
  let emailExist = await userModel.findOne({ email });
  if (emailExist) {
    return res.status(400).json({ message: "email already exist" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "passwords do not match" });
  }
  let hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS),
  );
  let newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
  return res.status(201).json({ message: "user created successfully" });
};
