const express = require("express");
const app = express();
const cors = require("cors");
const aiRoutes = require("./Src/Routes/ai.routes");

app.use(cors());
app.use(express.json());

app.use("/api" ,aiRoutes)

app.listen(5000, () => {
    console.log("Server is running on port 5000✅");
});