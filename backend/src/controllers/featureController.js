const { readDB, writeDB } = require("../utils/readWriteDB")

exports.getFeatures = (req, res) => {
    const db = readDB();
    const sorted = db.features.sort((a, b) => b.votes - a.votes)
    res.json(sorted)
}

exports.updateFeature = (req, res) => {
    const { id } = req.params;
    const userId = req.id;

    const db = readDB()

    const feature = db.features.find(f => f.id == id)

    if (!feature) {
        return res.status(404).json({
            message: "feature not found"
        })
    }

    const alreadyVoted = db.votes.find(
        v => v.userId === userId && v.featureId == id
    )

    if (alreadyVoted) {
        return res.status(400).json({
            message: "you already voted"
        })
    }

    feature.votes += 1

    db.votes.push({ userId, featureId: id })

    writeDB(db)

    res.json(feature)
}