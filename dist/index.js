"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const URLcontroller_1 = require("./controller/URLcontroller");
const express_1 = __importDefault(require("express"));
const MongoConnection_1 = require("./database/MongoConnection");
const api = (0, express_1.default)();
const urlController = new URLcontroller_1.URLcontroller();
api.use(express_1.default.json());
const database = new MongoConnection_1.MongoConnection();
database.connect();
api.get('/teste', (req, res) => {
    res.json({ sucesso: "Deu Bão!" });
});
api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);
api.listen(5000, () => console.log('Express listenig'));
//# sourceMappingURL=index.js.map