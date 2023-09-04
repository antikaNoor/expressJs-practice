const express = require('express')

const app = express()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// query params
app.get("/products", (req, res) => {
    const { id, name } = req.query
    console.log(id)
    console.log(name)
    res.status(200).send({ message: "GET request for query params" })
})

// path parameter
app.get("/products/detail/:id/:name", (req, res) => {
    const { id, name } = req.params
    console.log(id)
    console.log(name)
    res.status(200).send({ message: "GET request for path params" })
})

app.post("/products", (req, res) => {
    console.log(req.body.message)
    res.status(200).send({ message: "POST request" })
})

app.listen(8000, () => {
    console.log("Listening on port 8000...")
})