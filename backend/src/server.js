require("dotenv").config()

const express = require("express")
const cors = require("cors")

const waitListRoutes = require("./routes/waitlistRoutes")
const featureRoutes = require("./routes/featureRoutes")

const app = express();

app.use(cors())
app.use(express.json())

app.use("/waitlist", waitListRoutes)
app.use("/features", featureRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})