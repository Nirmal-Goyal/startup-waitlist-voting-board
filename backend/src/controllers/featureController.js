const { readDB, writeDB } = require("../utils/readWriteDB");

exports.getFeatures = (req, res, next) => {
  try {
    const db = readDB();

    const sorted = db.features.sort((a, b) => b.votes - a.votes);

    res.json(sorted);
  } catch (err) {
    next(err);
  }
};

exports.upvoteFeature = (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required to vote" });
    }

    const userId = email;

    const db = readDB();

    const feature = db.features.find(f => f.id == id);

    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    const alreadyVoted = db.votes.find(
      v => v.userId === userId && v.featureId == id
    );

    if (alreadyVoted) {
      return res.status(400).json({ message: "You already voted" });
    }

    feature.votes += 1;

    db.votes.push({ userId, featureId: id });

    writeDB(db);

    res.json(feature);
  } catch (err) {
    next(err);
  }
};