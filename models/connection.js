const mongoose = require("mongoose")
const CONNECTION_STRING = process.env.CONNECTION_STRING

mongoose.connect(CONNECTION_STRING, {connectTimeoutMS: 2000 })
.catch(error => console.error(error))
.then(console.log("Database Connected"))