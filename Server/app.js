const express = require("express");
const app = express();
const cors = require("cors");
const aiRoutes = require("./Src/Routes/ai.routes");
require('dotenv').config();
const db = require("./Src/Config/connection");
const LoginRoute = require("./Src/Routes/Login_Rotues")
const passport = require('./Src/Config/passport');
const authRoute = require('./Src/Routes/auth.route');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(passport.initialize());


app.use(cors({
    origin: process.env.FRONTEND_URL, // Update this to match your frontend URL
    credentials: true
}))
app.use(express.json());

app.use('/api/auth', authRoute);
app.use("/api" ,aiRoutes)
app.use("/api/login" , LoginRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on port ");
});