const Post = require("../models/post");


module.exports.home = function(req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 25) // change the value of cookie

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: 'Home',
    //         posts: posts
    //     });
    // });
    // populateu user of earh post
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home',{
            title: 'Home',
            posts: posts
        });
    })
   
}

