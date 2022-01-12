const express = require ('express');
const path = require('path');
const Handlebars = require('handlebars')
const { engine } = require('express-handlebars');

const methodOverride = require('method-override');
const  session = require('express-session');
const flash = require ('connect-flash');
const passport = require('passport');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');




//Initialization

const app = express();
require('./database');
require('./config/passport');


//Settings

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', engine({

    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    
 
 }));

app.set('view engine', '.hbs');


//Middlewares

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method')); //sirve para que los formularios puedan enviar otros tipos metodos como put delete

app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global variables

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})


// Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));



//Static Files

app.use(express.static(path.join(__dirname, 'public')));

//Server is listenning
app.listen (app.get('port'), () => {
    console.log('Server on Port ', app.get('port'));
});
