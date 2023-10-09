const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const Review = require("../models/review");
const mongoose = require("mongoose");

module.exports.home = async (req, res) => {
  try {
    let users = await User.find();
    let pending_reviews = await Review.find({
      from_user: req.user.id,
      reviewStatus: "Pending",
    }).populate("for_user");
    let submitted_reviews = await Review.find({
      from_user: req.user.id,
      reviewStatus: "Submitted",
    }).populate("for_user");
    return res.render("admin", {
      title: "Home",
      users: users,
      pending_reviews: pending_reviews,
      submitted_reviews: submitted_reviews,
    });
  } catch (error) {
    return res.render("admin", {
      title: "Home",
      users: [],
      pending_reviews: [],
      submitted_reviews: [],
    });
  }
};

module.exports.createPulseSurvey = async (req, res)=>{
  return res.render("pulse-survey", {
    title: "Pulse Survey",
    users: [],
    pending_reviews: [],
    submitted_reviews: [],
  });
};

module.exports.createSatisfactionSurvey = async (req, res)=>{
  return res.render("satisfaction-survey", {
    title: "Satisfaction Survey",
    users: [],
    pending_reviews: [],
    submitted_reviews: [],
  });
};

module.exports.createFeedbackSurvey = async (req, res)=>{
  let users = await User.find();
  return res.render("feedback-survey", {
    title: "Feedback Survey",
    users: users,
    pending_reviews: [],
    submitted_reviews: [],
  });
};
 
module.exports.addUserForm = async (req, res) => {
  return res.render("add-user", {
    layout: false,
  });
};

module.exports.createUser = async (req, res) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.status(400).json({
        message: "Password and Confirm Password not Same",
      });
    }
    let employee = await User.findOne({ email: req.body.email });
    if (employee) {
      return res.status(400).json({
        message: "User already exists with this Email",
      });
    }

    employee = await User.create(req.body);

    return res.status(200).json({
      data: {
        employee: employee,
      },
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "User could not be Created",
    });
  }
};

module.exports.editUserForm = async (req, res) => {
  try {
    let employee = await User.findById(req.body.employee_id);
    return res.render("edit-user", {
      layout: false,
      employee: employee,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    let employee = await User.findByIdAndUpdate(
      req.body.employee_id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      data: {
        employee: employee,
      },
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "User could not be Updated",
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.employee_id);
    await Review.deleteMany({
      $or: [
        { from_user: req.body.employee_id },
        { for_user: req.body.employee_id },
      ],
    });
    await User.updateMany({ $pull: { reviewers: req.body.employee_id } });

    return res.status(200).json({
      message: "User Removed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "User could not be Removed",
    });
  }
};

module.exports.assignReviewersForm = async (req, res) => {
  try {
    let employee = await User.findById(req.body.employee_id);
    let reviewers = await User.find({
      _id: { $nin: employee.reviewers, $ne: employee.id },
    });
    // console.log(reviewers);
    return res.render("assign-reviewers", {
      layout: false,
      employee: employee,
      reviewers: reviewers,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.assignReviewers = async (req, res) => {
  try {
    // console.log(req.body.reviewers);
    // let reviewer_ids = await req.body.reviewers.map((reviewer) => {
    //   return mongoose.Types.ObjectId(reviewer);
    // });
    let reviewer_ids = req.body.reviewers;
    let records = await reviewer_ids.map((reviewer) => {
      return {
        for_user: req.body.employee_id,
        from_user: reviewer,
      };
    });
    // console.log(records);
    await Review.insertMany(records);
    await User.findByIdAndUpdate(req.body.employee_id, {
      $push: { reviewers: { $each: reviewer_ids } },
    });
    return res.status(200).json({
      message: "Reviewers Assigned Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

module.exports.viewReviewers = async (req, res) => {
  try {
    let employee = await User.findById(req.params.user_id)
    .populate("reviewers");
    return res.render("view-reviewers", {
      title: "Employee Feedback",
      employee: employee,
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("back");
  }
};

module.exports.editFeedbackForm = async (req, res) => {
  try {
    let review = await Review.findOne({for_user: req.body.for_user, from_user: req.body.from_user})
    .populate("for_user")
    .populate("from_user");
    // console.log(review);
    return res.render("edit-feedback", {
      layout: false,
      review: review
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};
