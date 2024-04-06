const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [
      true,
      "Please provide a username in order us to know your account",
    ],
    maxlength: [13, "Username must not be more than 13 characters"],
    minlength: [7, "Username must be at least 7 characters"],
  },
  password: {
    type: String,
    required: [true, "Enter a password for this account"],
    minlength: [7, "Password length must be at least 7 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Enter a password for this account"],
    minlength: [7, "Password length must be at least 7 characters"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  // photo: String,
  roles: {
    type: String,
    enum: ["ADMIN", "MODERATOR", "SUPER-ADMIN", "ADMIN-CONTROLLER"],
    default: "ADMIN",
  },
  permissions: {
    type: [String],
    enum: ["READ", "CREATE", "UPDATE", "DELETE", "SELF", "NOTSELF"],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  willBeActivatedAt: Date,
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

adminSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now();
  next();
});

adminSchema.pre("save", function (next) {
  if (
    !this.roles.includes("ADMIN") &&
    !this.roles.includes("ADMIN-CONTROLLER") &&
    !this.roles.includes("SUPER-ADMIN")
  ) {
    this.roles = "MODERATOR";
    this.permissions = ["READ", "SELF"];
    next();
  } else if (
    !this.roles.includes("MODERATOR") &&
    !this.roles.includes("ADMIN-CONTROLLER") &&
    !this.roles.includes("SUPER-ADMIN")
  ) {
    this.roles = "ADMIN";
    this.permissions = ["READ", "SELF"];
    next();
  } else {
    this.permissions = ["READ", "CREATE", "UPDATE", "DELETE", "NOTSELF"];
    next();
  }
  next();
});

adminSchema.methods.checkPasswordMatch = async function (
  enteredPass,
  userPass
) {
  return await bcrypt.compare(enteredPass, userPass);
};

adminSchema.methods.changedPasswordAfter = function (JWTStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTStamp < changedTimeStamp;
  }

  return false;
};

adminSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
