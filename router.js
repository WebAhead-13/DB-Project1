const express = require('express');
const router = express.Router();
const handlers = require("./handlers");
const checkAuth = require("./middlewares/authentication")

// router. get/set 
router.get('/', handlers.home)
router.get('/log-in',handlers.login)
router.post('/log-in-submit',handlers.loginSubmit)
router.get('/askQuestion',checkAuth ,handlers.askQuestion)
router.get("/log-out", handlers.logout)
router.get("/getCookies", handlers.getCookies)
router.post('/addPost',handlers.addPost)
router.get('/viewComments',handlers.viewComments)
router.post('/addComment',handlers.addComment)

router.use((req, res) => {
    res.status(404).send(`<h1>Not found</h1>`)
  })



module.exports = router;