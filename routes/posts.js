const express = require('express');
const router = express.Router();

const passport = require('passport');

const postsController = require('../controllers/posts_controller');
//another level of security as passport.checkAuthentication as before on can fidle with posts
router.post('/create',passport.checkAuthentication, postsController.create);


module.exports = router;