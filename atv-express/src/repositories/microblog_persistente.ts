import { Database } from 'sqlite';
import Post from '../models/post';

export class MicroBlogPersistente {
    database!: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async createPost(post: Post) {
        await this.database.run(
            'INSERT INTO POST (POST_ID, POST_TEXT, LIKES, TITLE, DATE_POST) VALUES (?, ?, ?, ?, ?);',
            post.id,
            post.text,
            post.likes,
            post.title,
            post.datePost.toISOString()
        );
    }

    async retrievePost(id: string) {
        const data: Object | undefined = await this.database.get(`SELECT * FROM POST WHERE POST_ID = ?`, id);

        if (data == undefined) {
            throw new Error('Post inexistente');
        } else {
            const post: Post = Post.fromMap(data);
            return post;
        }
    }

    async updatePost(updatedPost: Post) {
        await this.database.run(
            `UPDATE POST SET POST_TEXT = ?, LIKES = ? WHERE POST_ID = ?`,
            updatedPost.text,
            updatedPost.likes,
            updatedPost.id
        );
    }

    async removerPost(id: string) {
        await this.database.run(`DELETE FROM POST WHERE POST_ID = ?`, id);
    }

    async retrieveAllPosts() {
        const data: Object | undefined = await this.database.all(`SELECT * FROM POST`);

        if (data == undefined) {
            throw new Error('Post inexistente');
        } else {
            const values = <Array<Object>>data;
            const lista: Array<Post> = values.map((value) => Post.fromMap(value));
            return lista;
        }
    }
}
