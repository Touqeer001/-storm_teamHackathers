const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

const passport = require("passport");

router.post("/feedback-form", passport.checkAuthentication, reviewController.feedbackForm);
router.post("/view-feedback", passport.checkAuthentication, reviewController.viewFeedback);
router.post("/update-feedback", passport.checkAuthentication, reviewController.updateFeedback);

module.exports = router;