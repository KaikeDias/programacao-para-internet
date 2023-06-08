import express, { Request, Response } from 'express';
import MicroBlog from './models/microblog';
import Post from './models/post';
import DatabaseRepository from './repositories/database_repository';
import { MicroBlogPersistente } from './repositories/microblog_persistente';
import CommentRepository from './repositories/comment_repository';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

(async () => {
    const app = express();
    const port = 3000;

    const microblog: MicroBlog = new MicroBlog();

    const repository: DatabaseRepository = await DatabaseRepository.initialize('./database/data.db');
    let microBlogPersistente = new MicroBlogPersistente(repository.database);
    let commentRepository = new CommentRepository(repository.database);

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
    app.use(cors());
    app.use(express.json());

    app.get('/posts', async (request: Request, response: Response) => {
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

            await microBlogPersistente.removerPost(selectedPost.id);
            response.status(204).send();
        } catch (error) {
            response.status(404).send("Can't find this post");
        }
    });

    app.post('/posts', async (request: Request, response: Response) => {
        const id = uuidv4();

        await microBlogPersistente.createPost({
            id: id,
            text: request.body.text,
            likes: 0,
            title: request.body.title,
            datePost: new Date(),
        });
        const createdPost = await microBlogPersistente.retrievePost(id);

        response.status(201).json(createdPost);
    });

    app.put('/posts/:id', async (request: Request, response: Response) => {
        try {
            const selectedPost: Post = await microBlogPersistente.retrievePost(request.params.id);

            selectedPost.text = request.body.text;
            selectedPost.likes = request.body.likes;

            await microBlogPersistente.updatePost(selectedPost);
            const updatedPost: Post = await microBlogPersistente.retrievePost(request.params.id);
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
            if (Object.keys(request.body).length !== 0) {
                response.status(400).send('Bad request');
                return;
            }

            const selectedPost: Post = await microBlogPersistente.retrievePost(request.params.id);

            selectedPost.likes++;

            await microBlogPersistente.updatePost(selectedPost);
            const updatedPost: Post = await microBlogPersistente.retrievePost(request.params.id);

            response.status(200).json(updatedPost);
        } catch (error) {
            response.status(404).send("Can't find this post");
        }
    });

    //comment routes
    app.post('/posts/comments', async (request: Request, response: Response) => {
        const commentId = '1';

        await commentRepository.createComment({
            commentId: commentId,
            content: request.body.content,
            postId: request.body.postId,
        });

        // const createdPost: Post = microblog.create({ id: id, text: request.body.text, likes: 0 });
        const createdComment = await commentRepository.getCommentById(commentId);

        response.status(201).json(createdComment);
    });

    app.get('/posts/comments/all/:id', async (request: Request, response: Response) => {
        try {
            const comments = await commentRepository.getAllComments(request.params.id);

            response.status(200).json(comments);
        } catch (error) {
            response.status(404).send("Can't find posts in the database");
        }
    });

    app.get('/posts/comments/:id', async (request: Request, response: Response) => {
        try {
            const comments = await commentRepository.getAllComments(request.params.id);

            response.status(200).json(comments);
        } catch (error) {
            response.status(404).send("Can't find comments in the database");
        }
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });

    app.delete('/posts/comments/:id', async (request: Request, response: Response) => {
        try {
            await microBlogPersistente.removerPost(request.params.id);
            response.status(204).send();
        } catch (error) {
            response.status(404).send("Can't find this comment");
        }
    });

    app.put('/posts/comments/:id', async (request: Request, response: Response) => {
        try {
            const selectedComment = await commentRepository.getCommentById(request.params.id);

            selectedComment.content = request.body.content;

            await commentRepository.updateComment(selectedComment);
            const updatedComment = await commentRepository.getCommentById(request.params.id);
            response.status(200).json(updatedComment);
        } catch (error) {
            response.status(404).send("Can't find this post");
        }
    });

})();
