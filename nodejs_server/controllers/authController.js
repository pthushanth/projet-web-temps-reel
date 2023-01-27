import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateTokens from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    // const { error } = signUpBodyValidation(req.body);
    // if (error)
    //   return res
    //     .status(400)
    //     .json({ error: true, message: error.details[0].message });

    const { firstname, lastname, username, email, password } = req.body;
    const usernameCheck = await User.findOne({ where: { username } });
    if (usernameCheck) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    console.log(req.body);
    const emailCheck = await User.findOne({ where: { email } });
    if (emailCheck) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // const salt = await bcrypt.genSalt(10);
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });
    user.password = undefined;
    delete user.password;
    console.log("---SUCCESS", JSON.stringify(user));

    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    if (
      err.errors &&
      Object.keys(err.errors).length > 0 &&
      err.name === "ValidationError"
    ) {
      return res.status(422).json({ message: err.message });
    } else {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    const user = await User.findOne({ where: { username } });
    console.log("test name", user.username, user.password);
    if (!user) {
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    }
    user.password = undefined;

    const { accessToken, refreshToken } = await generateTokens(user);
    console.log("---USER", isPasswordValid);

    console.log(accessToken, refreshToken);
    console.log("---SUCCESS", user);

    return res.status(200).json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
