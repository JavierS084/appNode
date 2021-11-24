const express = require ('express');
const app = express();
const path = require('path');
const exphbs = require('expess-handlebars');
//settings

app.set('port', process.env.PORT || 3000)

app.set('views', path.join(__dirname, 'wiews'));

app.engine('.hbs', exphbs ({


    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views', 'partials')),
    exrname: '.hbs'
}));
//middlewares


//global variables


// routes


//static files

//server is listenning
app.listen (app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});
