const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const passport = require("passport");

router.get("/",(req,res)=>{return res.redirect("/user/sign-in")});

router.get("/sign-in", userController.signIn);
router.post(
  "/sign-in",
  passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
  userController.loginUser
);

router.get("/sign-up", userController.signUp);
router.post("/sign-up", userController.createUser);

router.get("/sign-out", userController.signOut);

router.get("/profile", userController.profileRender);
router.get("/analysis", userController.renderAnalysis);

router.use("/admin",require("./admin"));
router.use("/employee",require("./employee"))

module.exports = router;