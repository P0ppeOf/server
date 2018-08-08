//const express = require('express') equivaut à (es5 vers es6)
import express from 'express'
import fs from 'fs'

const app = express()
var monJson = JSON.parse(fs.readFileSync('src/movies.json', 'utf8'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    next();
})

  app.use((req, res, next) => {
setTimeout(next, 1000)
});  


app.get('/Ping', (req, res) => {
    res
    .status(200)
    .setHeader('content-type', 'text/html')
    res.send('ssss');  
})

//fat arrow
app.get('/Movies', (req, res, next) => {
    //map c'est comme le foreach sauf qu'on selectionne quelle attributs on veut. Mais, il renvoit bien chaque ligne du tableau, selectionnée
    const filteredMovie = monJson.map(movie => {
        return {
            id: movie.id,
          title: movie.title,
          url: movie.url
        }
      })
      
     /* autre maniere d'ecrire 
      const filteredMovie = movies.map(({ title, url }) => {
        return { title, url}
      })
      */ 
    // res.send(monJson); avant d'utiliser map, on renvoyait tout le json
    res.send(filteredMovie)
}   
)

app.get('/Movies/:Id', (req, res, next) => {

    var idMov = req.params.Id

    const movie = monJson.find(movie => {
        return movie.id === idMov
    })
    
    res.send(movie);
}
)

/* selction d'une igne du tab en fonction d'un attribut
const movie = movies.find(movie => {
    return movie.title === 'titreFilm'
})
*/

app.listen(5000, () => console.log('Example app listening on port 5000!'))
