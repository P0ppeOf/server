//const express = require('express') equivaut à (es5 vers es6)
import express from 'express'
import fs from 'fs'
import { isEmpty } from './test'
import bodyParser from 'body-parser'
import config from 'config'
//body pars syntaxe ES6
//body pars syntaxe ES5
//var bodyParser = require('body-parser');

const app = express()

var monJson = JSON.parse(fs.readFileSync(config.get('fichierJson'), 'utf8'));



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(bodyParser.json());

  app.use((req, res, next) => {
setTimeout(next, config.get('timeout'))
});  

app.use(express.static('public'))

app.get('/Ping', (req, res) => {
    res
    .status(200)
    .setHeader('content-type', 'text/html')
    res.send('ssss');  
})

//fat arrow
app.get('/Movies', (req, res, next) => {
    //map c'est comme le foreach sauf qu'on selectionne quels attributs on veut. Mais, il renvoit bien chaque ligne du tableau, selectionnée
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
    if (!movie) return res.status(404).send('erreur')
    res.send(movie)
    
}
)

 //gerer la requete post qui vient du front
 app.post('/form',function(request,response){
     //1
     //equivaut à const {title, imgURL, synopsis} = request.body
    const titre = request.body.titre
    const imgURL=request.body.imgURL
    const synopsis=request.body.synopsis
    const id = Date.now()

    function validateField(str, msg) {
       if(!str || 0 === str.length ||  /^\s*$/.test(str)) {
           errors.push(msg)
       }
    }

    const errors = []
    validateField(titre, 'Titre obligatoire')
    validateField(imgURL, "Url obligatoire")
    validateField(synopsis, 'Synopsis obligatoire')
    if(errors.length >0) return response.status(400).send(errors)


    const newMovie = {
    'id': id.toString(), 
    'title': titre, 
    'url': imgURL, 
    'synopsys': synopsis
    }
/* J'aurais pu (en1) appeler mes variables avec les noms proprs au JSON ->
id, title, url et synopsis, et juste faire
 const newMovie = {
     id,
     title,
     url,
     synopsys
 } 
 vu que le nom est le même, on economise un peu de texte
 id à la place de 'id' : id
 Et j'aurai pu faire id = max.toString et ecrire directement id dans mon newMovie
 */

     
    monJson.push(newMovie)
    fs.writeFile(config.get('fichierJson'), JSON.stringify(monJson), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });
    console.log(newMovie)
    response.status(200).send(newMovie)
    }); 


/* selction d'une igne du tab en fonction d'un attribut
const movie = movies.find(movie => {
    return movie.title === 'titreFilm'
})
*/

export default app