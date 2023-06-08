"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const microblog_1 = __importDefault(require("./models/microblog"));
const database_repository_1 = __importDefault(require("./repositories/database_repository"));
const microblog_persistente_1 = require("./repositories/microblog_persistente");
const comment_repository_1 = __importDefault(require("./repositories/comment_repository"));
const { v4: uuidv4 } = require('uuid');
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const port = 3000;
    const microblog = new microblog_1.default();
    const repository = yield database_repository_1.default.initialize('./database/data.db');
    let microBlogPersistente = new microblog_persistente_1.MicroBlogPersistente(repository.database);
    let commentRepository = new comment_repository_1.default(repository.database);
    // microblog.create(
    //     {
    //         id: '1',
    //         text: 'loren',
    //         likes: 5
    //     }
    // );
    // microblog.create(
    //     {
    //         id: '2',
    //         text: 'ipslum',
    //         likes: 10
    //     }
    // );
    app.use(express_1.default.json());
    app.get('/posts', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield microBlogPersistente.retrieveAllPosts();
            response.status(200).json(posts);
        }
        catch (error) {
            response.status(404).send("Can't find posts in the database");
        }
    }));
    app.get('/posts/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const selectedPost = yield microBlogPersistente.retrievePost(request.params.id);
            response.status(200).json(selectedPost);
        }
        catch (error) {
            response.status(404).send("Can't find this post");
        }
    }));
    app.delete('/posts/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const selectedPost = yield microBlogPersistente.retrievePost(request.params.id);
            yield microBlogPersistente.removerPost(selectedPost.id);
            response.status(204).send();
        }
        catch (error) {
            response.status(404).send("Can't find this post");
        }
    }));
    app.post('/posts', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(request.body);
        const id = '1';
        yield microBlogPersistente.createPost({
            id: id,
            text: request.body.text,
            likes: 0,
            title: request.body.title,
            datePost: new Date()
        });
        const createdPost = yield microBlogPersistente.retrievePost(id);
        response.status(201).json(createdPost);
    }));
    app.put('/posts/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const selectedPost = yield microBlogPersistente.retrievePost(request.params.id);
            selectedPost.text = request.body.text;
            selectedPost.likes = request.body.likes;
            yield microBlogPersistente.updatePost(selectedPost);
            const updatedPost = yield microBlogPersistente.retrievePost(request.params.id);
            response.status(200).json(updatedPost);
        }
        catch (error) {
            response.status(404).send("Can't find this post");
        }
    }));
    app.patch('/posts/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const selectedPost = yield microBlogPersistente.retrievePost(request.params.id);
            if ('text' in request.body) {
                selectedPost.text = request.body.text;
            }
            if ('likes' in request.body) {
                selectedPost.likes = request.body.likes;
            }
            yield microBlogPersistente.updatePost(selectedPost);
            const updatedPost = yield microBlogPersistente.retrievePost(request.params.id);
            response.status(200).json(updatedPost);
        }
        catch (error) {
            response.status(404).send("Can't find this post");
        }
    }));
    app.patch('/posts/:id/like', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (Object.keys(request.body).length !== 0) {
                response.status(400).send('Bad request');
                return;
            }
            const selectedPost = yield microBlogPersistente.retrievePost(request.params.id);
            selectedPost.likes++;
            yield microBlogPersistente.updatePost(selectedPost);
            const updatedPost = yield microBlogPersistente.retrievePost(request.params.id);
            response.status(200).json(updatedPost);
        }
        catch (error) {
            response.status(404).send("Can't find this post");
        }
    }));
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
    //comment routes
    app.post('/posts/comments', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const commentId = uuidv4();
        yield commentRepository.createComment({ commentId: commentId, content: request.body.content, postId: request.body.postId });
        // const createdPost: Post = microblog.create({ id: id, text: request.body.text, likes: 0 });
        const createdComment = yield commentRepository.getCommentById(commentId);
        response.status(201).json(createdComment);
    }));
    app.get('/posts/comments/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const comments = yield commentRepository.getAllComments(request.params.id);
            response.status(200).json(comments);
        }
        catch (error) {
            response.status(404).send("Can't find comments in the database");
        }
    }));
}))();
