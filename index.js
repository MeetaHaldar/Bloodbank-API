require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = 2000 || Process.env.PORT;
const authRoutes = require("./routes/auth");
const bloodSampleRoutes = require("./routes/bloodBank");
const bloodSampleList = require("./controllers/bloodBank");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", bloodSampleList.bloodSampleList);
app.use("/auth", authRoutes);
app.use("/bloodSample", bloodSampleRoutes);
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
