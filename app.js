const express = require('express')
const router = require('./routes')
const app = express()
const dotenv = require("dotenv")
const path = require('path')
const port = 3000


dotenv.config();
// Menerima request body ==> JSON
app.use(express.json())
// Menerima request body ==> urlencoded
app.use(express.urlencoded({extended: true}))

app.use("/upload", express.static(path.join(__dirname, './upload')))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})