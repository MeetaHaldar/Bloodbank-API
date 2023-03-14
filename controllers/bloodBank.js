const BloodSample = require("../models/BloodSample");
const mongoose = require("mongoose");
const Request = require("../models/Request");
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
  let bloodSampleId = req.params.id;
  bloodSampleId = bloodSampleId.trim();
  const hospital = req.user._id;
  if (mongoose.Types.ObjectId.isValid(bloodSampleId)) {
    const objectId = new mongoose.Types.ObjectId(bloodSampleId.trim());
    const hospitalId = new mongoose.Types.ObjectId(hospital);
    const isSamplePresent = await BloodSample.find({
      _id: objectId,
      hospital: hospitalId,
    });
    if (isSamplePresent.length == 0) {
      return res.send("no such sample is present");
    }
    const result = await BloodSample.findOneAndDelete({
      _id: objectId,
      hospital: hospitalId,
    });
    res.send(result);
  } else {
    res.send("This BloodSample is not present / Invalid ObjectId");
  }
};
/** @type {import("express").RequestHandler} */

const updateBloodSample = async (req, res) => {
  if (req.user.userType !== "Hospital") {
    return res.send(
      "you can not update blood sample , as you are not a member of Hospital"
    );
  }
  let bloodSampleId = req.params.id;
  bloodSampleId = bloodSampleId.trim();
  let hospital = req.user._id;
  console.log(hospital);
  if (mongoose.Types.ObjectId.isValid(bloodSampleId)) {
    const newbloodSampleId = new mongoose.Types.ObjectId(bloodSampleId.trim());
    const hospitalId = new mongoose.Types.ObjectId(hospital);
    const isSamplePresent = await BloodSample.find({
      _id: objectId,
      hospital: hospitalId,
    });
    if (isSamplePresent.length == 0) {
      return res.send("no such sample is present");
    }
    const result = await BloodSample.findOneAndUpdate(
      { _id: newbloodSampleId, hospital: hospitalId },
      { $set: req.body },
      {
        new: true,
      }
    );
    res.send(result);
  } else {
    res.send("This BloodSample is not present / Invalid ObjectId");
  }
};
const myBloodSample = async (req, res) => {
  if (req.user.userType !== "Hospital") {
    return res.send(
      "you can not update blood sample , as you are not a member of Hospital"
    );
  }
  let userId = new mongoose.Types.ObjectId(req.user._id);
  const result = await BloodSample.find({ hospital: userId });
  res.send(result);
};

const requestBloodSampleList = async (req, res) => {
  if (req.user.userType !== "Hospital") {
    return res.send(
      "you can not get blood sample list , as you are not a member of Hospital"
    );
  }
  let userId = new mongoose.Types.ObjectId(req.user._id);
  const result = await Request.find({ hospital: userId });
  res.send(result);
};
module.exports = {
  addBloodSample,
  bloodSampleList,
  deleteBloodSample,
  updateBloodSample,
  myBloodSample,
  requestBloodSampleList,
};
