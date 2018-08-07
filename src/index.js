//const express = require('express') equivaut à (es5 vers es6)
import express from 'express'
import fs from 'fs'

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    next();
})

app.use((req, res, next) => {
setTimeout(next, 5000)
});


app.get('/Ping', (req, res) => {
    res
    .status(200)
    .setHeader('content-type', 'text/html')
    res.send('ssss');  
})

//fat arrow
app.get('/Movies', (req, res, next) => {

    var monJson = JSON.parse(fs.readFileSync('src/movies.json', 'utf8'));
    res.send(monJson); 
    next();
}
)


app.listen(5000, () => console.log('Example app listening on port 5000!'))
