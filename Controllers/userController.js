// const db = require("../Config/database");
const fs = require("fs");
const sendMail = require("@sendgrid/mail");
const API_KEY =
  "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";
sendMail.setApiKey(API_KEY);

const db = require("../Models/index.model");

const User = db.students;

// const newUser = db.User;

const getUser = async (req, res) => {
  let data = await User.findAll();
  res.send(data);
};

const userCreate = async (req, res) => {
  try {
    let data = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      age: req.body.age,
      description: req.body.description,
      password: "12345678",
      is_admin: 0,
    });
    res.send("User created successfully");
    sendMail.send({
      to: req.body.email,
      from: "neerajmangoit@gmail.com",
      templateId: "d-d520ce1a9ebd45d1b44b3f7711cda85b",
    });
  } catch (error) {
    res.send(error);
  }
};

const VerifyUser = async (req, res) => {
  try {
    let data = await User.update(
      {
        password: req.body.newPassword,
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
    res.send(error);
  }
};

const login = async (req, res) => {
  let data = await User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });
  if (!data) {
    res.send("Please enter valid credentials");
  } else {
    res.send(data);
  }
};

module.exports = {
  getUser,
  userCreate,
  VerifyUser,
  login,
};
