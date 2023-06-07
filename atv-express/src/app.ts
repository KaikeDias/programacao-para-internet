import express, { Request, Response } from 'express';
import MicroBlog from './models/microblog';
import Post from './models/post';
import DatabaseRepository from './repositories/database_repository';
import { MicroBlogPersistente } from './repositories/microblog_persistente';
import CommentRepository from './repositories/comment_repository';
const { v4: uuidv4 } = require('uuid');

(async () => {
    const app = express();
    const port = 3000;

    const microblog: MicroBlog = new MicroBlog();

    const repository: DatabaseRepository = await DatabaseRepository.initialize('./database/data.db');
    let microBlogPersistente = new MicroBlogPersistente(repository.database) 
    let commentRepository = new CommentRepository(repository.database);

    microblog.create(
        {
            id: '1',
            text: 'loren',
            likes: 5
        }
    );

    microblog.create(
        {
            id: '2',
            text: 'ipslum',
            likes: 10
        }
    );

    app.use(express.json());

    app.get('/posts', async(request: Request, response: Response) => {
        try {
            const posts = await microBlogPersistente.retrieveAllPosts();

            response.status(200).json(posts);
        } catch (error) {
            response.status(404).send("Can't find posts in the database");
        }
    });

    app.get('/posts/:id', async (request: Request, response: Response) => {
        try {
            const selectedPost: Post = await microBlogPersistente.retrievePost(request.params.id);

            response.status(200).json(selectedPost);
        } catch (error) {
            response.status(404).send("Can't find this post");
        }
    });

    app.delete('/posts/:id', async (request: Request, response: Response) => {
        try {
            const selectedPost: Post = await microBlogPersistente.retrievePost(request.params.id);

            await microBlogPersistente.removerPost(selectedPost.id)
            response.status(204).send()
        } catch (error) {
            response.status(404).send("Can't find this post");
        }
    });

    app.post('/posts',async (request: Request, response: Response) => {
        const id = '1'
        await microBlogPersistente.createPost({id: id, text: request.body.text, likes: 0})
        // const createdPost: Post = microblog.create({ id: id, text: request.body.text, likes: 0 });
        const createdPost = await microBlogPersistente.retrievePost(id);

        response.status(201).json(createdPost);
    });

    app.put('/posts/:id', async (request: Request, response: Response) => {
        try {
            const selectedPost: Post = await microBlogPersistente.retrievePost(request.params.id);

            selectedPost.text = request.body.text;
            selectedPost.likes = request.body.likes;

            await microBlogPersistente.updatePost(selectedPost);
            const updatedPost: Post = await microBlogPersistente.retrievePost(request.params.id)
            response.status(200).json(updatedPost);
        } catch (error) {
            response.status(404).send("Can't find this post");
        }
    });

    app.patch('/posts/:id', async (request: Request, response: Response) => {
        try {
            const selectedPost: Post = await microBlogPersistente.retrievePost(request.params.id);

            if ('text' in request.body) {
                selectedPost.text = request.body.text;
            }
            if ('likes' in request.body) {
                selectedPost.likes = request.body.likes;
            }

            await microBlogPersistente.updatePost(selectedPost);
            const updatedPost: Post = await microBlogPersistente.retrievePost(request.params.id);
            response.status(200).json(updatedPost);
        } catch (error) {
            response.status(404).send("Can't find this post");
        }
    });

    app.patch('/posts/:id/like', async (request: Request, response: Response) => {
        try {
            const selectedPost: Post = await microBlogPersistente.retrievePost(request.params.id);

            selectedPost.likes++;

            await microBlogPersistente.updatePost(selectedPost);
            const updatedPost: Post = await microBlogPersistente.retrievePost(request.params.id);
            response.status(200).json(updatedPost);
        } catch (error) {
            response.status(404).send("Can't find this post");
        }
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });

    //comment routes
    app.post('/posts/comments',async (request: Request, response: Response) => {
        const commentId = uuidv4();
        await commentRepository.createComment({commentId: commentId, content: request.body.content, postId: request.body.postId});
        // const createdPost: Post = microblog.create({ id: id, text: request.body.text, likes: 0 });
        const createdComment = await commentRepository.getCommentById(commentId);

        response.status(201).json(createdComment);
    });

    app.get('/posts/comments/:id', async(request: Request, response: Response) => {
        try {
            const comments = await commentRepository.getAllComments(request.params.id);

            response.status(200).json(comments);
        } catch (error) {
            response.status(404).send("Can't find comments in the database");
        }
    });

})();