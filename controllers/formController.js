const express = require('express');
const router = express.Router();
const YourModel = require('../models/formData');

// Handle form submission
router.post('/submit-satisfaction-form', (req, res) => {
    const { department, satisfaction, enjoy, email } = req.body;

  const newDataEntry = new YourModel({
    username: req.user.username,
    department,
    satisfaction,
    enjoy,
    email,
  });

  newDataEntry.save((err) => {
    if (err) {
      console.error('Error saving data entry:', err);
      // Handle the error
    } else {
      // Data entry saved successfully
      // Redirect or respond as needed
      res.redirect('/'); // Redirect to a success page, for example
    }
  });
});

module.exports = router;
