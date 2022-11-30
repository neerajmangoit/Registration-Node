const db = require("../models/index.model");
const User = db.students;
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  let data = await User.findAll({
    attributes: { exclude: ["password"] },
    where: {
      is_admin: "0",
    },
  });
  res.send(data);
};

// Function for handling validation errors
const errorValidationHandeler = (error) => {
  switch (error.path) {
    case "first_name":
      return error.message;
  }
  switch (error.path) {
    case "last_name":
      return error.message;
  }
  switch (error.path) {
    case "email":
      return error.message;
  }
  switch (error.path) {
    case "age":
      return error.message;
  }
  switch (error.path) {
    case "password":
      return error.message;
  }
};

const userCreate = async (req, res) => {
  const temporaryPassword = Math.floor(Math.random() * 100000000);

  try {
    let data = await User.create({
      first_name: req.body.first_name.toLowerCase(),
      last_name: req.body.last_name.toLowerCase(),
      email: req.body.email.toLowerCase(),
      age: req.body.age,
      description: req.body.description,
      password: temporaryPassword,
      is_admin: 0,
    });
    // Sending mails
    res.send("User created successfully");
    if (res) {
      sendMail.send({
        to: req.body.email,
        from: "neerajmangoit@gmail.com",
        text: temporaryPassword,
        templateId: "d-d520ce1a9ebd45d1b44b3f7711cda85b",
      });
    }
  } catch (error) {
    let errors = [];
    if (error.errors) {
      error.errors.forEach((element) => {
        let err = errorValidationHandeler(element);
        errors.push({
          [element["path"]]: err,
        });
      });
      res.status(400).send(errors);
    }
  }
};

const userVerify = async (req, res) => {
  let salt = genSaltSync(8);

  try {
    let data = await User.update(
      {
        password: hashSync(req.body.newPassword, salt),
      },
      {
        where: {
          email: req.body.email,
          password: req.body.oldPassword,
        },
      }
    );

    if (data == 0) {
      res.send("Please enter the correct details");
    } else {
      res.send("User verified successfully");
    }
  } catch (error) {
    let errors = [];
    error.errors.forEach((element) => {
      let err = errorValidationHandeler(element);
      errors.push({
        [element["path"]]: err,
      });
    });
    res.status(400).send(errors);
  }
};

const login = async (req, res) => {
    let data = await User.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (data) {
        let comparedPassword = compareSync(req.body.password, data.password);
        if (comparedPassword) {
            jwt.sign({ data }, "jwtKey", { expiresIn: 86400 }, (err, token) => {
                if (err) {
                    res.sendStatus("something went wrong");
                }
                res.send({ data, auth: token });
            });
        } else {
            res.status(400).send("Please enter valid credentials");
        }
    } else {
        res.status(400).send("Please enter valid credentials");
    }
};

module.exports = {
  getUser,
  userCreate,
  userVerify,
  login,
};