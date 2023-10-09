const db = require("./config/mongoose");
const User = require("./models/user");

User.findOne(
  { email: "admin@gmail.com", role: "admin" },
  function (error, user) {
    if (error) {
      console.log(error);
      console.log("Admin could not be created");
      return;
    }
    if (!user) {
      User.create({ email: "admin@gmail.com", password:"admin12345", name:"Admin", role: "Admin" }, function (error, user) {
        if (error) {
          console.log(error);
          console.log("Admin could not be created");
          return;
        } else {
          console.log("Admin Created Successfully: admin@gmail.com, pass- admin12345");
          return;
        }
      });
    } else {
      console.log("Admin Already Exists");
      return;
    }
  }
);
