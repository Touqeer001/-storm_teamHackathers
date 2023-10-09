const express = require("express");
const router = express.Router();
const YourModel = require("../models/plusData");

// Handle form submission
router.post("/submit-plussurvey-form", (req, res) => {
  const { plusSurvey, plusSurvey2, plusSurvey3 } = req.body;

  const newDataEntry = new YourModel({
    plusSurvey,
    plusSurvey2,
    plusSurvey3,
  });

  newDataEntry.save((err) => {
    if (err) {
      console.error("Error saving data entry:", err);
      // Handle the error
    } else {
      // Data entry saved successfully
      // Redirect or respond as needed
      res.redirect("/"); // Redirect to a success page, for example
    }
  });
});

module.exports = router;
