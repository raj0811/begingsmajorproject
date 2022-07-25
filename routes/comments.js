const express = require('express');
const passport = require('passport');
const router = express.Router();


const commentsController = require('../controllers/comments_controller');


router.post('/create',passport.checkAuthentication, commentsController.create);
router.get('/info',passport.checkAuthentication, commentsController.info);



module.exports = router;