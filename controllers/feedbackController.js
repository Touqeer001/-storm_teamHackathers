const Feedback = require('../models/feedback');

exports.handleFeedbackSubmission = async (req, res) => {
  try {
    // Extract data from the request body
    const { user, rating, suggestion, email } = req.body;
    console.log(req.body);
    // Create a new FormData document
    const formData = new Feedback({
      user,
      rating,
      suggestion,
      email
    });

    await formData.save();

    res.redirect('/');
  } catch (error) {
    // Handle errors, e.g., show an error page or return an error message
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};