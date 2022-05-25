import { URLcontroller } from './controller/URLcontroller'
import express, { Request, Response } from 'express'
import { MongoConnection } from './database/MongoConnection'

const api = express()

const urlController = new URLcontroller()
api.use(express.json())

const database = new MongoConnection()
database.connect()

api.get('/teste', (req: Request, res: Response) => {
    res.json({sucesso: "Deu Bão!"})
})
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)


api.listen(5000, () => console.log('Express listenig'))

