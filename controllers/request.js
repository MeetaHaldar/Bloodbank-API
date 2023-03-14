const Request = require("../models/Request");
const requestBloodSample = async (req, res) => {
  if (req.user.userType != "Receiver") {
    return res.send(
      "you can not request for blood sample as you are not a Receiver"
    );
  }
  const { hospital, bloodGroup, quantity } = req.body;
  if (!hospital || !bloodGroup || !quantity) {
    return res.send("each field is required");
  }
  const newRequest = new Request({
    hospital,
    receiver: req.user._id,
    bloodGroup,
    quantity,
  });
  try {
    const request = await newRequest.save();
    res.send(request);
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = { requestBloodSample };
