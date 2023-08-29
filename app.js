const express = require('express')
const mangaRouter = require('./routes/manga')

const app = express()
app.use(express.json())

app.use("/manga", mangaRouter)

// using route() method to get the invalid routes
app.route('*')
  .get((req, res) => {
    res.status(400).send("Invalid route!")
  })
  .put((req, res) => {
    res.status(400).send("Invalid route!")
  })
  .post((req, res) => {
    res.status(400).send("Invalid route!")
  })
  .delete((req, res) => {
    res.status(400).send("Invalid route!")
  })

app.listen(8000, () => {
  console.log("Server is running on 8000...")
})
