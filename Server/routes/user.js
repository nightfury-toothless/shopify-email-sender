const express = require("express");
const router = express.Router();
const { getUser, updateTemplate } = require("../controllers/user");

router.get("/user", getUser);
router.post("/user/template", updateTemplate);

module.exports = router;
