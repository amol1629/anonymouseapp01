require("dotenv").config();
const express = require("express");

const cors = require("cors");

require("./database/mongodbConnection");

const bodyParser = require("body-parser");

const connectDB = require("./database/mongodbConnection");
const userRegisterRoute = require("./routes/user/userRegister");
const userLoginRoute = require("./routes/user/userLogin");
const getAllUsersRoute = require("./routes/user/getAllUsers");
const deleteSingleUserRoute = require("./routes/user/deleteSingleUser");
const deleteMultipleUserRoute = require("./routes/user/deleteMultipleUsers");
const userSearchRoute = require("./routes/user/searchUserByName");
const updateSingleUserRoute = require("./routes/user/updateUser");
const adminRegisterRoute = require("./routes/admin/adminRegister");
const adminLoginRoute = require("./routes/admin/adminLogin");
const { searchUserByName } = require("./controllers/user/searchUserController");

const router = new express.Router();

const app = express();

app.use(express.json());

app.use(bodyParser.json());

const PORT = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:3000", // or '*' for allowing any origin
  credentials: true, // to support credentials like cookies
};
app.use(cors(corsOptions));

// app.use()
// Users
app.use("/register", userRegisterRoute);
app.use("/login", userLoginRoute);
app.use("/user/deleteMultiple", deleteMultipleUserRoute);
app.use("/allusers", getAllUsersRoute);
app.use("/user", deleteSingleUserRoute);
app.use("/search", userSearchRoute);
app.use("/update", updateSingleUserRoute);

// Admin
app.use("/adminregister", adminRegisterRoute);
app.use("/adminlogin", adminLoginRoute);

// Connect to Database
connectDB();

// router.post("/login", insertNewCustomer);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
