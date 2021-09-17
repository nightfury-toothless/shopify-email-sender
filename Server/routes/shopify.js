const express = require("express");
const router = express.Router();
const { install, authenticate } = require("../controllers/shopify");

router.get("/install", install);
router.get("/auth", authenticate);

module.exports = router;
