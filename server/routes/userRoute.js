const { login, getUsers } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.route("/login").post(login);
userRouter.route("/").get(getUsers);

exports.userRouter = userRouter;