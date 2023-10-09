const User = require("../models/user");
const Review = require("../models/review");
const fs = require("fs");
const path = require("path");

module.exports.feedbackForm = async (req, res) => {
  try {
    let review = await Review.findOne({
      for_user: req.body.for_user,
      from_user: req.user.id,
    }).populate("for_user");

    return res.render("feedback-form", {
      layout: false,
      review: review,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.viewFeedback = async (req, res) => {
  try {
    let review = await Review.findOne({
      for_user: req.body.for_user,
      from_user: req.user.id,
    }).populate("for_user");

    return res.render("view-feedback", {
      layout: false,
      review: review,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.updateFeedback = async (req, res) => {
  try {
    let reviewStatus = "Submitted";
    if (!req.body.feedback) reviewStatus = "Pending";
    let review = await Review.findByIdAndUpdate(req.body.review_id, {
      feedback: req.body.feedback,
      reviewStatus: reviewStatus,
    });

    return res.status(200).json({
      data: {
        previousStatus: review.reviewStatus,
        reviewStatus: reviewStatus,
        employee: {
          id: req.body.for_user,
          name: req.body.for_user_name,
          email: req.body.for_user_email,
        },
      },
      message: "Feedback Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Feedback could not be Updated",
    });
  }
};
