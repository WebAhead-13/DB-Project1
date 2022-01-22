const express = require('express');
const router = express.Router();
const handlers = require("./handlers");

// router. get/set 

router.get('/', handlers.home)
router.use((req, res) => {
    res.status(404).send(`<h1>Not found</h1>`)
  })
  

module.exports = router;