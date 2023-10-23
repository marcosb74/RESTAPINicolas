const Usuarios = require("../models/Usuarios.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res, next) => {
  const user = new Usuarios(req.body);

  user.password = await bcrypt.hash(req.body.password, 10);

  try {
    await user.save();
    res.json({ mensaje: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "There was an error" });
  }
};

exports.authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Usuarios.findOne({ email });

  if (!user) {
    await res.status(401).json({ mensaje: "User does not exist" });
    next();
  } else {
    if (!bcrypt.compareSync(password, user.password)) {
      await res.status(401).json({ mensaje: "Incorrect Password" });
      next();
    } else {
      const token = jwt.sign(
        {
          email: user.email,
          usuario: user.nombre,
          id: user._id,
        },
        process.env.SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.json({ token });
    }
  }
};
