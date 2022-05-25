import { config } from "../config/Constants";
import { Request, response, Response } from "express";
import shortId from 'shortId'
import { URLModel } from "../database/model/URL";

export class URLcontroller {
    public async shorten( req: Request, res: Response ): Promise<void> {
        //Ver se a URL jah nao existe
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL})
        if (url) {
            res.json(url)
            return
        }
        //Criar o hash para esta URL
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        
        //Salvar URL no banco
        const newURL = await URLModel.create({ originURL, hash, shortURL })

        //Retornar a URL salva
        res.json(newURL)
    }

    public async redirect( req: Request, res: Response ): Promise<void> {
        //Pegar hash da url
        const { hash } = req.params
        //Encontar a url original pelo hash
        const url = await URLModel.findOne({ hash })
        
        //Redirecionar para a url original a partir do banco
        if (url) {
            res.redirect(url.originURL)
            return
        }
        res.status(400).json({ error: "URL não encontrada" })
    }
}