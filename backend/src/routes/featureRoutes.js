const express = require("express");
const router = express.Router();

const {
  getFeatures,
  upvoteFeature
} = require("../controllers/featureController");

router.get("/", getFeatures);
router.post("/:id/upvote", upvoteFeature);

module.exports = router;