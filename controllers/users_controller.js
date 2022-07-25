const User = require('../models/user');



// module.exports.profile = function(req, res) {
//     if (req.cookies.user_id) {
//         User.findById(req.cookies.user_id, function(err, user) {

//             if (user) {
//                 return res.render('profile', {
//                     title: "user profile",
//                     user: user
//                 })
//             }
//             return res.redirect('/users/sign-in');
//         })

//     } else {
//         res.redirect('/users/sign-in')
//     }
//     // return res.end('<h1>user profilel</h1>')
// }

module.exports.profile = function(req, res) {
    return res.render('profile', {
        title: "user profile"
    })
}


// Render sign up page
module.exports.signUp = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up', {
        title: "Sign Up"
    })
}

// Render sign in page
module.exports.signIn = function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    return res.render('user_sign_in', {
        title: "Sign In"
    })
}

module.exports.info = function(req, res) {
    return res.end('<h1>User info</h1>')
}

// get signup data
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_passwird) {
        res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log("error in finding user in signing up", err);
            return
        }
        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) {
                    console.log("error in creating  user wgile signing up");
                    return
                }
                return res.redirect('/users/sign-in')

            })
        } else {
            res.redirect('back');
        }
    })
}

// signin and creaetsession

module.exports.createSession = function(req, res) {
    return res.redirect('/');
}

// get signin data
// module.exports.createSession = function(req, res) {
//     //find the user
//     User.findOne({ email: req.body.email }, function(err, user) {
//         if (err) { console.log('error in finding user in signin in'); return }
//         //handel if user found

//         if (user) {

//             //chk pass
//             if (user.password != req.body.password) {
//                 return res.redirect('back');
//             }
//             // handel session creation
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');

//         } else {
//             //handel if user not found

//             return res.redirect('back');
//         }
//     })


// }

// // logout
// module.exports.logout = function(req, res) {
//     res.cookie('user_id', '', { maxAge: 1 })
//     return res.redirect('/users/sign-in')

// }

module.exports.destroySession = function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/')
        
    });
    
}