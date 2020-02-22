const express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const app = express();
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
const port = 3000;

app.get('/',
    (req, res) => {
        if(req.session.page_views){
            req.session.page_views++;
            res.send("Odwiedziłem tę stronę " + req.session.page_views + " razy");
        } else {
            req.session.page_views = 1;
            res.send("Jestem tu pierwszy raz!");
        }
});


app.get('/test',
    (req, res) => {
    // console.log('test');
    // console.log(req);
    // console.log(res);
    res.send('Testowa podstrona')}
);

app.get('/test2',
    (req, res) => {
        res.send('Testowa podstrona nr 2')}
);

// app.get('/test/:id/:user',
//     (req, res) => {
//         console.log(req.params.id);
//         res.send(`Testowa podstrona Twoje id ${req.params.id} i user ${req.params.user}`)}
// );


app.get('/test/:id',
    (req, res) => {
    let cookieVal = req.cookies.id === undefined ? 'brak' : req.cookies.id;

    res.cookie("id", req.params.id).send(`Poprzedni parametr: ${cookieVal}, bieżący parametr: ${req.params.id}`);
    console.log(req.cookies.id);
});

app.get('*',
    (req, res) => res.send('Ups, coś poszło nie tak! Brak wskazanego adresu')
);
app.listen(port,
    () => console.log(`Example app listening on port ${port}!`));