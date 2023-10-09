const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  // await mongoose.connect(`mongodb://127.0.0.1/employee_review`);
  await mongoose.connect(
    `mongodb+srv://dbUser:kadriWali@cluster0.p4zsdrs.mongodb.net/myDatabase?retryWrites=true&w=majority`
  );
  console.log(`Connected to DB : employee_review`);
}

const db = mongoose.connection;

module.exports = db;
