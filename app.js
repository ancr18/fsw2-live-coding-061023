require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const expressLayouts = require("express-ejs-layouts")

const router = require("./routes")

const PORT = process.env.PORT
const app = express()

// config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(router)
app.use(express.static(`${__dirname}/public`))
app.use(expressLayouts)

// setting
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

// local middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

app.listen(PORT, () => {
  console.log(`server run at port ${PORT}`)
})
