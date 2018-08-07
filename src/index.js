//const express = require('express') equivaut à (es5 vers es6)
import express from 'express'
import fs from 'fs'

const app = express()
var monJson = JSON.parse(fs.readFileSync('src/movies.json', 'utf8'));

app.get('/Ping', (req, res) => {
    res
    .status(200)
    .setHeader('content-type', 'text/html')
    res.send('ssss');  
})

app.get('/Movies', (req, res) => {
    res.send(monJson);  
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))
