const express = require("express")
const router = express.Router()

const {addEmail} = require("../controllers/waitlistController")

router.post("/", addEmail)

module.exports = router