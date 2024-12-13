const express = require("express")
const dotenv = require("dotenv")
const router = require("./routes/taskRouter")


const app = express()
dotenv.config()

app.use(express.json())

app.use("/tasks", router)

const PORT = process.env.PORT


app.listen(PORT, console.log("listening to port" + PORT))