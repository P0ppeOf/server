import should from 'should'
import app from '../src/app'
import supertest from 'supertest'
import { movieList } from './movieList'
import config from 'config'
import fs from 'fs'

beforeEach('Reset movie file', () => {
   fs.writeFileSync(config.get('fichierJson'), movieList)
})

describe('Get movies', () => {
    it('should send a list of movies', done => {
        supertest(app)
        .get('/Movies')
        .expect(200)
        .expect(res => {
                should.exist(res.body)
                res.body.should.be.a.Array
                res.body.length.should.above(0)
                res.body[0].should.have.only.keys('id', 'title', 'url')
        })
        .end(done)
    })

    it('should send a movie by id', done => {
        supertest(app)
        .get('/Movies/1')
        .expect(200)
        .expect(res => {
                should.exist(res.body)
                res.body.should.be.a.Object
               
                res.body.should.have.keys('id', 'title', 'url', 'synopsys')
        })
        .end(done)
    })

    it('should send a movie by id 404', done => {
        supertest(app)
        .get('/Movies/25')
        .expect(404)
        .expect(res => {
                should.exist(res.body)
                res.body.should.not.be.empty    
        })
        .end(done)
    })

        it('should get a form 200', done => {
            supertest(app)
            .post('/form')
            .send({titre: 'john', imgURL: 'fu', synopsis: 'chon'})
            .expect(200)
            .expect(res=> {
                should.exist(res.body)  
                res.body.should.be.a.Object 
            })
            .end(done)
        })

        it('should get a form 400', done => {
            supertest(app)
            .post('/form')
            .expect(400)
            .expect(res => {
                should.exist(res.body)       
            })
            .end(done)
        })
})
