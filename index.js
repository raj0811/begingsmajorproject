const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8001;

const db = require('./config/mongoose');


const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passpoer-local-strategy');
const expressLayouts = require('express-ejs-layouts');
// const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const nodeSassMiddleware = require('node-sass-middleware');

var MongoDBStore = require('connect-mongodb-session')(session);


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('assets'));




// setup view engin
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store session cookie in the db


app.use(session({
    name: 'codiel',
    // todo chnage secret before deployment in production mode
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)

    },
    store: new MongoDBStore({
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passpoer-local-strategy')

app.use(passport.setAuthenticatedUser);



//use expres router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);
})