const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    for_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reviewStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Submitted"],
      default: "Pending"
    },

    feedback: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
