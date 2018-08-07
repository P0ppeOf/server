//const express = require('express') equivaut à (es5 vers es6)
import express from 'express'
import fs from 'fs'

//handler : c'est une fonction avec (req, res, next)

const app = express()

/*on peut aussi definir une fonction genre headerMiddleware(req, res, next) = > {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    nex();
}
Qu'on appelle dans app.get.....,
headeriddleware,
(req, res) = > {
    autre fonction ...
}
*/

app.get('/Ping', (req, res) => {
    res
    .status(200)
    .setHeader('content-type', 'text/html')
    res.send('ssss');  
})

//fat arrow
app.get('/Movies', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    next();
}, (req, res, next) => {
    var monJson = JSON.parse(fs.readFileSync('src/movies.json', 'utf8'));
    res.send(monJson); 
    next(); 
}
)


//Sans fat arrow
/* app.get('/Movies', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    next();
}, function (req, res, next) {
    var monJson = JSON.parse(fs.readFileSync('src/movies.json', 'utf8'));
    res.send(monJson); 
    next(); 
}
) */



app.listen(5000, () => console.log('Example app listening on port 5000!'))
