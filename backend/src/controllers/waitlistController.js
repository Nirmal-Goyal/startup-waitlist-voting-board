const {readDB, writeDB} = require("../utils/readWriteDB")

exports.addEmail = (req, res) => {
    const {email} = req.body

    if(!email || !email.includes("@")){
        return res.status(400).json({
            message: "Invalid email"
        })
    }

    const db = readDB();

    const exists = db.waitlist.find(e => e.email === email);

    if(exists){
        return res.status(400).json({message: "email already exists"});
    }

    db.waitlist.push({email})

    writeDB(db);

    res.json({
        message: "Added to waitlist"
    })
}