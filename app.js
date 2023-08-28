const { success, failure } = require("./utils/success-error")
const Products = require("./model/products")
const path = require("path")
const express = require('express')
const products = require("./model/products")

const app = express()
app.use(express.json())

// get all
app.get("/manga/all", async (req, res) => {
  try {
    const result = await products.getAll()
    if (result.success) {
      res.status(200).send(success(result.message, result.data))
    } else {
      res.status(500).send(failure(result.message))
    }
  } catch (error) {
    res.status(500).send(failure(result.message))
  }
})


// get one by id
app.get("/manga/detail/:id", async (req, res) => {
  try {
    const { id } = req.params
    const result = await products.getOneById(parseInt(id))
    if (result.success) {
      res.status(200).send(success(result.message, result.data))
    } else {
      res.status(500).send(failure(result.message))
    }
  } catch (error) {
    res.status(500).send(failure(result.message))
  }
})

// delete one by id
app.delete("/manga/delete", async (req, res) => {
  try {
    const { id } = req.query

    const result = await products.deleteOneById(parseInt(id))
    if (result.success) {
      res.status(200).send(success(result.message, result.data))
    } else {
      res.status(500).send(failure(result.message))
    }
  } catch (error) {
    res.status(500).send(failure(result.message))
  }
})

// Update something
app.put("/manga/up/:id", async (req, res) => {

  try {
    const { id } = req.params
    console.log(req.body)
    const result = await Products.updateOneById(
      parseInt(id),
      (req.body)
    )
    if (result.success) {
      res.status(200).send(success(result.message, result.data))
    } else {
      res.status(200).send(failure(result.message, result.data))
    }
    res.status(200).send()
  }
  catch (error) {
    res.status(500).send(failure(result.message))
  }
})

// Add something
app.post("/manga/create/", async (req, res) => {

  try {
    const result = await Products.add(req.body)
    if (result.success) {
      res.status(200).send(success(result.message, result.data))
    } else {
      res.status(200).send(failure(result.message))
    }
    res.status(200).send()
  }
  catch (error) {
    res.status(500).send(failure(result.message))
  }
})

// get by stock and price
app.get("/manga/stockandprice/:stock/:price", async (req, res) => {
  try {
    const { stock, price } = req.params
    const result = await products.getByPriceAndStock(parseInt(stock), parseFloat(price))
    if (result.success) {
      res.status(200).send(success(result.message, result.data))
    } else {
      res.status(500).send(failure(result.message))
    }
  } catch (error) {
    res.status(500).send(failure(result.message))
  }
})

// Sort data by id
app.get("/manga/sortbyid", async (req, res) => {
  try {
    const result = await products.sortDataById()
    if (result.success) {
      res.status(200).send(success(result.message, result.data))
    } else {
      res.status(500).send(failure(result.message))
    }
  } catch (error) {
    res.status(500).send(failure(result.message))
  }
})
// // Sort data by name
app.get("/manga/sortbyname", async (req, res) => {
  try {
    const result = await products.sortDataByName()
    if (result.success) {
      res.status(200).send(success(result.message, result.data))
    } else {
      res.status(500).send(failure(result.message))
    }
  } catch (error) {
    res.status(500).send(failure(result.message))
  }
})

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
