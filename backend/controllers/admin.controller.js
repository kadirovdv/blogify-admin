const Admin = require("../models/admin.model");
const appAsyncHandler = require("../utils/app.async.handler");
const ErrorMessage = require("../utils/error.handler");

const filteredBody = (obj, ...allowedFields) => {
  const newObject = {};

  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      newObject[key] = obj[key];
    }
  });

  return newObject;
};

exports.getAllAdmins = appAsyncHandler(async (request, response) => {
  const admins = await Admin.find({}).populate("creator");

  response.status(200).json({
    success: true,
    count: admins.length,
    admins
  })
});

exports.getAdminById = appAsyncHandler(async (request, response, next) => {
  const admin = await Admin.findById(request.params.id).populate(
    "createdAdmins"
  );

  if (!admin) {
    return next(new ErrorMessage("Admin not found", 404));
  }

  response.json(admin);
});

exports.permissions = (...permissions) => {
  return async (request, response, next) => {
    const admin = await Admin.findById(request.body.id);
    permissions?.forEach((persmission) => {
      if (request.admin && !request.admin.permissions.includes(persmission)) {
        return next(
          new ErrorMessage("You are not allowed to perform this action", 403)
        );
      }
    });

    if (
      admin?.roles?.includes("SUPER-ADMIN") ||
      admin?.roles?.includes("ADMIN-CONTROLLER") ||
      request?.body?.role?.includes("SUPER-ADMIN") ||
      request?.body?.role?.includes("ADMIN-CONTROLLER")
    ) {
      return next(
        new ErrorMessage(
          `SUPER-ADMINS and ADMIN-CONTROLLERS can not delete and deactivate themselves"!`,
          403
        )
      );
    }

    if (
      admin?.username === request?.admin?.username &&
      admin?.roles === request?.admin?.roles
    ) {
      return next(
        new ErrorMessage(
          `SUPER-ADMINS and ADMIN-CONTROLLERS can not delete and deactivate themselves"!`,
          403
        )
      );
    }
    next();
  };
};

exports.deleteAdminById = appAsyncHandler(async (request, response, next) => {
  await Admin.findByIdAndDelete(request.params.id);
  response.status(200).json({
    status: "success",
    message: "Admin deleted successfully",
  });
});

exports.updateAdmin = appAsyncHandler(async (request, response, next) => {
  if (request.body.password || request.body.passwordConfirm) {
    return next(
      new ErrorMessage(
        "In order to change your password, go to the update passwords page!",
        400
      )
    );
  }

  const payload = filteredBody(request.body, "username", "email");

  const updatedAdmin = await Admin.findByIdAndUpdate(
    request.admin._id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  response.status(200).json(updatedAdmin);
});

exports.createAdminManually = appAsyncHandler(
  async (request, response, next) => {
    const { username } = request.body;

    const ifUserExists = await Admin.findOne({ username: username });

    if (request.body.username === request.body.password) {
      return next(
        new ErrorMessage("Username and password cannot be same", 400)
      );
    } else if (request.body.password === request.body.email) {
      return next(new ErrorMessage("Password and email cannot be same", 400));
    } else if (request.body.username === request.body.email) {
      return next(new ErrorMessage("Username and email cannot be same", 400));
    }

    if (ifUserExists) {
      return next(new ErrorMessage("Admin already exists", 400));
    }

    const admin = await Admin.create({
      ...request.body,
      creator: request.admin._id,
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

    response.status(200).json({
      status: "success",
      message: "Admin created successfully",
      admin,
    });
  }
);

exports.blockAdmin = appAsyncHandler(async (request, response, next) => {
  let date = new Date();
  let advancedDays = new Date(date);
  advancedDays.setDate(advancedDays.getDate() + 30);

  const admin = await Admin.findById(request.body.id);

  if (admin) {
    if (!admin.active) {
      admin.active = true;
      admin.willBeActivatedAt = undefined;
      admin.save({ validateBeforeSave: false });
      response.status(200).json({
        status: "success",
        message: "Admin unblocked successfully",
      });
    } else {
      await Admin.findByIdAndUpdate(request.body.id, {
        active: false,
        willBeActivatedAt: advancedDays,
      });
      response.status(200).json({
        status: "success",
        message: "Admin blocked successfully",
      });
    }
  }

  if (!admin) {
    return next(new ErrorMessage("Admin not found", 400));
  }
});

exports.deleteAdminsByRole = appAsyncHandler(
  async (request, response, next) => {
    const { role } = request.body;

    const requestRole = await Admin.deleteMany({ roles: role });

    response.status(200).json({
      message: requestRole.deletedCount + " " + "admins have been deleted.",
    });
  }
);

exports.getAllCreatedAdmins = appAsyncHandler(
  async (request, response, next) => {
    console.log(request.admin);
    const admins = await Admin.findById(request.admin._id).populate(
      "createdAdmins"
    );

    if (!admins) {
      response
        .status(204)
        .json({ message: "You have not created any admins yet." });
    }

    response.status(200).json({ admins: admins });
  }
);
