const Admin = require("../models/admin.model");
const appAsyncHandler = require("../utils/app.async.handler");
const ErrorMessage = require("../utils/error.handler");
const jwt = require("jsonwebtoken");
const promisify = require("util.promisify");
const crypto = require("crypto");
const sendEmail = require("../utils/send.email");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createAndSendToken = (admin, statusCode, response) => {
  const token = signToken(admin._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  response.cookie("jwt", token, cookieOptions);

  admin.password = undefined;

  response.status(statusCode).json({ admin, token });
};

exports.signup = appAsyncHandler(async (request, response, next) => {
  const { username } = request.body;

  const ifAdminUsernameExists = await Admin.findOne({ username: username });
  const ifAdminEmailExists = await Admin.findOne({ email: request.body.email });

  if (
    !request.body.username &&
    !request.body.password &&
    !request.body.passwordConfirm
  ) {
    return next(
      new ErrorMessage(
        "Username, password and password confirm are required",
        400
      )
    );
  }

  if (!request.body.username) {
    return next(new ErrorMessage("Username is required", 400));
  } else if (!request.body.password) {
    return next(new ErrorMessage("Password is required", 400));
  } else if (!request.body.passwordConfirm) {
    return next(new ErrorMessage("Password confirm is required", 400));
  }

  if (
    request.body.username &&
    request.body.password &&
    request.body.username === request.body.password
  ) {
    return next(new ErrorMessage("Username and password cannot be same", 400));
  } else if (
    request.body.password &&
    request.body.email &&
    request.body.password === request.body.email
  ) {
    return next(new ErrorMessage("Password and email cannot be same", 400));
  } else if (
    request.body.username &&
    request.body.email &&
    request.body.username === request.body.email
  ) {
    return next(new ErrorMessage("Username and email cannot be same", 400));
  }

  if (ifAdminUsernameExists || ifAdminEmailExists) {
    return next(new ErrorMessage("Admin already exists", 400));
  }

  const admin = await Admin.create({
    ...request.body,
    passwordChangedAt: Date.now(),
  });
  /*
    username: request.body.username,
    password: request.body.password,
    passwordConfirm: request.body.passwordConfirm,
    roles: request.body.roles,
    email: request.body.email,
    permissions,
    passwordChangedAt,
  */

  createAndSendToken(admin, 201, response);
});

exports.login = appAsyncHandler(async (request, response, next) => {
  const { username, password, email } = request.body;
  let admin;

  if ((!username && !password) || (!email && !password)) {
    return next(new ErrorMessage("Fill the required fields!", 400));
  }

  if (!username && !email) {
    return next(
      new ErrorMessage("Provide your username or your email address!", 400)
    );
  }

  if (username) {
    admin = await Admin.findOne({
      username: username,
      active: { $ne: false },
    }).select("+password");
  }

  if (email) {
    admin = await Admin.findOne({
      email: email,
      active: { $ne: false },
    }).select("+password");
  }

  if (!admin) {
    return next(
      new ErrorMessage("Admin is not found or has been blocked", 400)
    );
  }

  if (!(await admin.checkPasswordMatch(password, admin.password))) {
    return next(new ErrorMessage("Incorrect password!", 401));
  }

  createAndSendToken(admin, 200, response);
});

exports.protect = appAsyncHandler(async (request, response, next) => {
  let token;

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    token = request.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorMessage("Login to keep the work!", 401));
  }

  const decode = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

  const admin = await Admin.findById(decode.id);

  if (admin.active === false) {
    return next(
      new ErrorMessage(
        "Your account is blocked temporarily, try again later",
        401
      )
    );
  }

  if (!admin) {
    return next(new ErrorMessage("Admin is not found", 401));
  }

  if (admin.changedPasswordAfter(decode.iat)) {
    return next(
      new ErrorMessage(
        "Your password has been changed recently, login again",
        401
      )
    );
  }

  request.admin = admin;
  next();
});

exports.updatePassword = appAsyncHandler(async (request, response, next) => {
  const admin = await Admin.findById(request.admin.id).select("+password");

  if (
    await admin.checkPasswordMatch(request.body.newPassword, admin.password)
  ) {
    return next(
      new ErrorMessage(
        "You new password can not be same with the previous or current password!",
        401
      )
    );
  }

  if (
    !(await admin.checkPasswordMatch(
      request.body.passwordCurrent,
      admin.password
    ))
  ) {
    return next(new ErrorMessage("Your current password is incorrect!", 401));
  }

  admin.password = request.body.newPassword;
  admin.passwordConfirm = request.body.passwordConfirm;
  await admin.save();
  createAndSendToken(admin, 200, response);
});

exports.forgotPassword = appAsyncHandler(async (request, response, next) => {
  let admin;

  if (
    request.body.hasOwnProperty("email") &&
    request.body.hasOwnProperty("username")
  ) {
    return next(new ErrorMessage("Enter your email address or username"));
  }

  if (request.body.email) {
    const { email } = request.body;

    admin = await Admin.findOne({ email: email });
  }

  if (request.body.username) {
    const { username } = request.body;
    admin = await Admin.findOne({ username: username });
  }

  if (!admin) {
    return next(new ErrorMessage("Admin not found", 404));
  }

  const resetToken = admin.createPasswordResetToken();
  await admin.save({ validateBeforeSave: false });
  // response.json(resetToken);

  const resetURL = `${request.protocol}://${request.get(
    "host"
  )}/api/admin/reset/password/${resetToken}`;

  const message = `Password reset successfully sent to ${resetURL}`;

  try {
    await sendEmail({
      email: admin.email,
      subject: "Your reset password has been reset and valid for 10 minutes.",
      message,
    });

    response.status(200).json({
      status: "success",
      message: "Password reset link has been sent to your email",
    });
  } catch (error) {
    admin.passwordResetToken = undefined;
    admin.passwordResetExpires = undefined;
    await admin.save({ validateBeforeSave: false });
    return next(
      new ErrorMessage(
        "There was an error send reset url, try again later!",
        500
      )
    );
  }
});

exports.resetPassword = appAsyncHandler(async (request, response, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(request.params.token)
    .digest("hex");

  const admin = await Admin.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!admin) {
    return next(
      new ErrorMessage("Password reset token is invalid or has expired", 400)
    );
  }

  if (!request.body.passwordConfirm) {
    return next(new ErrorMessage("Please confirm your password", 400));
  }

  admin.password = request.body.password;
  admin.passwordConfirm = request.body.passwordConfirm;
  admin.passwordResetToken = undefined;
  admin.passwordResetExpires = undefined;
  await admin.save();

  response.status(200).json({
    status: "success",
    message: "Password reset successfully",
  });
});
