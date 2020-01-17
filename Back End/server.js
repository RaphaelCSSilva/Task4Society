const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const db = require("./models/");
const expressValidator = require('express-validator');
const passport = require("./config/passport/passport");
const router = require('./routes/mainRoutes.js');

app.use(cors({
  //exposedHeaders: ['Location']
  origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5501'],
  credentials: true
}));

/* app.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:5500', 'http://127.0.0.1:5501'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
}); */


 
/* //allowed domains
const permittedLinker = ['localhost', '127.0.0.1', process.env.IP]; // who can link here?
app.use(function(req, res, next) {
  let i = 0,
    notFound = 1,
    referer = req.get('Referer');
  if ((req.path === '/') || (req.path === '')) {
    res.send('{"message" : "Unauthorized access", "desc": "Your domain is not registered"}');
  } 
  if (referer) {
    while ((i < permittedLinker.length) && notFound) {
      notFound = (referer.indexOf(permittedLinker[i]) === -1);
      i++;
    }
  }
  if (notFound) {
    console.log("notfound");
    res.send('{"message" : "Unauthorized access", "desc": "Your domain is not registered"}');
  }
  else {
    next(); // access is permitted, go to the next step in the ordinary routing
  }
}); */

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(cookieParser());

app.use(expressValidator());

app.use(session({ 
  secret: "miegsipw", 
  resave: true, 
  saveUninitialized: true,
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    name: 'session',
    keys: ['123'],
    //domain: '.localhost',
    httpOnly: true
    //secure: false,
    //credentials: true
  }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



//import routes
//const AuthRoutes = require('./routes/auth.route');
//const ReservasRotas = require('./routes/reservasRoutes');
require("./routes/auth.route.js")(app);
//app.use('/', express.static('public'));
app.use('/', router);

app.use((req, res, next) =>  {
  var err = new Error('Page not found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});



app.listen(port, (err) => {
    if (!err) {
        console.log(`App listening on ${host} and port ${port}`);
    } else {
        console.log(err);
    }
})

//Sync Database
db.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine');

}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});


module.exports = app;