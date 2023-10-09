const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

const passport = require("passport");

router.get("/",(req,res)=>{return res.redirect("/user/admin/home")});

router.get("/home", passport.checkAdminAuthentication, adminController.home);
router.get("/pulse-survey", passport.checkAdminAuthentication, adminController.createPulseSurvey);
router.get("/satisfaction-survey", passport.checkAdminAuthentication, adminController.createSatisfactionSurvey);
router.get("/feedback-survey", passport.checkAdminAuthentication, adminController.createFeedbackSurvey);
router.get("/add-user-form", passport.checkAdminAuthentication, adminController.addUserForm);
router.post("/create-user", passport.checkAdminAuthentication, adminController.createUser);
router.post("/edit-user-form", passport.checkAdminAuthentication, adminController.editUserForm);
router.post("/update-user", passport.checkAdminAuthentication, adminController.updateUser);
router.post("/delete-user", passport.checkAdminAuthentication, adminController.deleteUser);
router.post("/assign-reviewers-form", passport.checkAdminAuthentication, adminController.assignReviewersForm);
router.post("/assign-reviewers", passport.checkAdminAuthentication, adminController.assignReviewers);
router.get("/view-reviewers/:user_id", passport.checkAdminAuthentication, adminController.viewReviewers);
router.post("/edit-feedback-form", passport.checkAdminAuthentication, adminController.editFeedbackForm);

module.exports = router;