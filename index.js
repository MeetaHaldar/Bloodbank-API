require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = 2000 || Process.env.PORT;

const bloodSampleRoutes = require("./routes/bloodBank");
const bloodSampleList = require("./controllers/bloodBank");
const requestRoutes = require("./routes/request");
const hospitalRoutes = require("./routes/hospital");
const receiverRoutes = require("./routes/receiver");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", bloodSampleList.bloodSampleList);
app.use("/hospital", hospitalRoutes);
app.use("/receiver", receiverRoutes);
app.use("/bloodSample", bloodSampleRoutes);
app.use("/request", requestRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
