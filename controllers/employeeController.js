const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const Review = require("../models/review");

module.exports.home = async (req, res) => {
  try {
    let users = await User.find();
    let pending_reviews = await Review.find({from_user: req.user.id, reviewStatus: "Pending"})
    .populate("for_user");
    let submitted_reviews = await Review.find({from_user: req.user.id, reviewStatus: "Submitted"})
    .populate("for_user");
    return res.render("employee", {
      title: "Home",
      users: users,
      pending_reviews: pending_reviews,
      submitted_reviews: submitted_reviews
    });
    
  } catch (error) {
    return res.render("employee", {
      title: "Home",
      users: [],
      pending_reviews: [],
      submitted_reviews: []
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