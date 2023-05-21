"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const microblog_1 = __importDefault(require("./models/microblog"));
const app = (0, express_1.default)();
const port = 3000;
const microblog = new microblog_1.default();
microblog.create({
    id: 1,
    text: 'loren',
    likes: 5
});
microblog.create({
    id: 2,
    text: 'ipslum',
    likes: 10
});
app.use(express_1.default.json());
app.get('/posts', (request, response) => {
    const posts = microblog.retrieveAll();
    response.status(200).send(posts);
});
app.post('/api/posts', (req, res) => {
    const { title, body } = req.body;
    res.send('Postagem recebida com sucesso!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
