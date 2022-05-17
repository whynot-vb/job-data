import User from "../models/userModel.js";
import { BadRequestError, UnAuthorizedError } from "../errors.js";

export const register = async (req, res) => {
  const { userName, email, password, location } = req.body;

  if (!userName || !email || !password) {
    throw new BadRequestError("You must provide all the values");
  }
  const userNameAlreadyExists = await User.findOne({ userName });
  if (userNameAlreadyExists) {
    throw new BadRequestError("User with that username already exists");
  }
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("User with that email already exists");
  }

  const user = await User.create({ userName, email, location, password });
  const token = user.createJWT();

  res.status(201).json({
    user: {
      userName: user.userName,
      location: user.location,
      email: user.email,
    },
    token,
  });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(
      "You must provide an email and password to login"
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthorizedError("No user with that email");
  }

  const isPasswordOk = await user.comparePassword(password);
  if (!isPasswordOk) {
    throw new UnAuthorizedError("Wrong password");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({ user, token });
};
export const updateUser = async (req, res) => {
  const { email, userName, location } = req.body;
  if ((!email, !userName, !location)) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.userName = userName;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  res.status(200).json({ user, token });
};
