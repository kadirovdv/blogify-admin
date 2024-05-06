const express = require("express");
const authController = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");
const hpp = require("hpp");

const router = express.Router();

router.route("/").get(authController.protect, adminController.getAllAdmins);

router.route("/signup").post(authController.signup);

router
  .route("/create")
  .post(authController.protect, adminController.createAdminManually);

router.route("/login").post(authController.login);

router.post("/forgot/password", authController.forgotPassword);
router.get("/availability/:id", authController.checkCurrentAdminAvailability);

router.patch("/reset/password/:token", authController.resetPassword);

router.patch(
  "/update/password",
  authController.protect,
  authController.updatePassword
);

router.patch(
  "/update",
  authController.protect,
  adminController.permissions("UPDATE"),
  adminController.updateAdmin
);

router.patch(
  "/block",
  authController.protect,
  adminController.permissions("UPDATE"),
  adminController.blockAdmin
);

router
  .route("/:id")
  .get(authController.protect, adminController.getAdminById)
  .delete(
    authController.protect,
    adminController.permissions("DELETE"),
    adminController.deleteAdminById
  );

router
  .route("/delete/byrole")
  .delete(
    authController.protect,
    adminController.permissions("DELETE"),
    adminController.deleteAdminsByRole
  );

module.exports = router;
