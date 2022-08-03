const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');


router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);


router.get('/userinfo', usersController.info);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);



router.post('/create', usersController.create);
// user passport as a middle ware 
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/user/sign-in' }
), usersController.createSession);

router.get('/sign-out', usersController.destroySession)



// router.get('/logout', usersController.logout);


module.exports = router;