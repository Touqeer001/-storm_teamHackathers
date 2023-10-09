const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{return res.redirect("/user/sign-in")});
router.use("/user",require("./user"));
router.use("/review",require("./review"))

module.exports = router;