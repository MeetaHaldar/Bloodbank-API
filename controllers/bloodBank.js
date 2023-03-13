const BloodSample = require("../models/BloodSample");
// import { ObjectId } from "mongodb";
const ObjectId = require("mongoose").Types.ObjectId;
const addBloodSample = async (req, res) => {
  if (req.user.userType == "Hospital") {
    const { bloodGroup, quantity, expirationDate } = req.body;
    if (!bloodGroup || !quantity || !expirationDate) {
      return res.send("each field is required");
    }
    const newBloodSample = new BloodSample({
      hospital: req.user._id,
      bloodGroup,
      quantity,
      expirationDate,
    });
    try {
      const bloodSample = await newBloodSample.save();
      res.send(bloodSample);
    } catch (err) {
      res.json({ message: err.message });
    }
  } else {
    res.send(
      "you can not add blood sample , as you are not a member of Hospital"
    );
  }
};
const bloodSampleList = async (req, res) => {
  const list = await BloodSample.find();
  res.send(list);
};
/** @type {import("express").RequestHandler} */

const deleteBloodSample = async (req, res) => {
  if (req.user.userType !== "Hospital") {
    return res.send(
      "you can not add blood sample , as you are not a member of Hospital"
    );
  }
  const bloodSampleId = req.params.id;
  const hospital = req.user._id;
  console.log(bloodSampleId);
  const result = await BloodSample.findOneAndDelete({
    _id: bloodSampleId,
    hospital,
  });

  res.send(result);
};
/** @type {import("express").RequestHandler} */

const updateBloodSample = async (req, res) => {
  if (req.user.userType !== "Hospital") {
    return res.send(
      "you can not update blood sample , as you are not a member of Hospital"
    );
  }
  const bloodSampleId = req.params.id;
  const hospital = req.user._id;
  const result = await BloodSample.findOneAndUpdate(
    { _id: bloodSampleId, hospital },
    req.body,
    {
      new: true,
    }
  );
  res.send(result);
};
module.exports = {
  addBloodSample,
  bloodSampleList,
  deleteBloodSample,
  updateBloodSample,
};
