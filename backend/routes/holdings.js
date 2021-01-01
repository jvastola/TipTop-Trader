const router = require('express').Router();
const { check, validationResult} = require("express-validator/check");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");




let Holdings = require('../models/holdings.model');

router.get("/user_holdings", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const held = await Holdings.findById(req.user.id);
      res.json(held);
    } catch (e) {
      res.send({ message: "Error in Fetching user data" });
    }
  });


module.exports = router;