const { success, failure } = require("../utils/success-error");
const adminLoginModel = require("../model/adminLoginModel"); // Correct import

class AdminLoginController {
  async loginAdmin(req, res) {
    try {
      const result = await adminLoginModel.loginAdmin(req.body); // Use adminLoginModel
      if (result.success) {
        // console.log(result.data)
        // res.setHeader('Content-Type', 'application/json');
        res.status(200).send(success(result.message, result.data));
      } else {
        res.status(500).send(failure(result.message));
      }
    } catch (error) {
      res.status(500).send(failure(error.message));
    }
  }
}

module.exports = new AdminLoginController();