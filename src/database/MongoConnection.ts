import { config } from "../config/Constants";
import mongoose from "mongoose";

export class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.MONGO_CONNECTION, /*{ useNewUrlParser: true, useUnifiedTopology: true }*/)
            console.log("CONECTADO AO BANCO")
        }
        catch(e) {
            console.log("ERRO DE CONEXAO COM O BANCO\n" + e)
            process.exit(1)
        } 
    }
}