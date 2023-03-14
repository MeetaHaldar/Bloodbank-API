const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BloodSchema = new Schema({
  hospital: { type: Schema.Types.ObjectId, ref: "hospital", required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  quantity: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
});

module.exports = mongoose.model("BloodSample", BloodSchema);
