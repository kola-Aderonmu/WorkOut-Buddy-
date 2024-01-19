const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password, username) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email.trim())) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password.trim())) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email }); //to check for email exitence

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10); //the bigger the number, the longer it takes for the hashing and the more secure it is, but also the longer it takes fro thr user to be signup. 10 is defsult normal
  const hash = await bcrypt.hash(password, salt);

  //creating the variable needed
  const user = await this.create({ email, password: hash, username });

  console.log(user);

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  console.log(email);
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
