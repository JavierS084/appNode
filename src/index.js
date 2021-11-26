const express = require ('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const  session = require('express-session');
//Settings

app.set('port', process.env.PORT || 3000)

app.set('views', path.join(__dirname, 'wiews'));

app.engine('.hbs', exphbs ({

    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views', 'partials')),
    extname: '.hbs'

}));

app.set('view engine', '.hbs');


//Middlewares

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//global variables


// routes
app.use(require('.routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));



//static files

//server is listenning
app.listen (app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});
