const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// connecting to mongodb database named pclone
// .connect(`mongodb://127.0.0.1:27017/pclone`
// .connect(`mongodb+srv://amol:amol@ecommerce.v2dyyvu.mongodb.net/pentkart`

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(
          `\nYour application is connected to MongoDB database successfully.\n`
        );
      })
      .catch((e) => {
        console.log(`\nOops...Connection to MongoDB database is failed.\n`);
        console.log(e);
      });
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
