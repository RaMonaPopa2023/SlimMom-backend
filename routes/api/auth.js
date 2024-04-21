const express = require("express");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiRefreshTokenSchema,
} = require("../../models");
const { authCtrl: ctrl } = require("../../controllers");
const { auth, ctrlWrapper, validation } = require("../../middlewares");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", ctrlWrapper(auth), ctrlWrapper(ctrl.logout));

router.get("/current", ctrlWrapper(auth), ctrlWrapper(ctrl.current));

router.post(
  "/refresh-tokens",
  validation(joiRefreshTokenSchema),
  ctrlWrapper(ctrl.refreshTokens)
);

module.exports = router;
