const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersController = require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication, usersController.profile);


router.get('/sign_in', usersController.signIn);
router.get('/sign_up', usersController.signUp);


router.post('/create', usersController.create);

//use passport as middle ware to auth
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign_in'}
),usersController.createSession);

 router.get('/sign_out',usersController.destroySession)


module.exports =router;
