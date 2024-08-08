import UserModel from "../models/userModel.js";

export const Register = async () => {
  try {
    const { error } = validateSignUp(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { username, password, email } = req.body;
    let user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({
        error: "username is already exits",
      });
    }

    //HASHED PASSWORD HERE
    const salt = await bcrypt.genSalt(Number(process.env.salt));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
    });

    if (newUser) {
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        message: "Initail data uploaded",
      });
    } else {
      res.status(400).json({ error: "Invalid User data" });
    }
  } catch (error) {
    console.log(error.message, "Error in Register controller");
    res.status(400).json({ error: error.message || "internal server error" });
  }
};

export const otpMobile = () => {
  const { phone } = req.body;
};

const validateSignUp = (body) => {
  const Schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().required(),
  });
  const result = Schema.validate(body);
  return result;
};
