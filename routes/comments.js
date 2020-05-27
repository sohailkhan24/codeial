const express = require('express');
const router = express.Router();

const passport = require('passport');

const commentsController = require('../controllers/comments_controller');
//another level of security as passport.checkAuthentication as before on can fidle with posts
router.post('/create',passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

module.exports = router;