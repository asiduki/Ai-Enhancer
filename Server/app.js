const express = require("express");
const app = express();
const cors = require("cors");
const aiRoutes = require("./Src/Routes/ai.routes");

app.use(cors());
app.use(express.json());

app.use("/api", aiRoutes);

// ✅ Listen on Render's dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});
