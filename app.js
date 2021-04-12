const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const mysql = require('mysql2');
const app = express();
const port = 7000;

// Mysql database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'gauri',
    password: '@Gauri2055712',
    database: 'node_crud_mysql'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected.');
    }
})

// Session config
app.use(session({
    secret: 'This is our secret kuro la guys',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Passport config
// const passportInit = require('./app/config/passport');
// passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Set for the static file or assets
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);

app.listen(port, () => console.log(`App listening on port ${port}!`))