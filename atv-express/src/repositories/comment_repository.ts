import { Database } from 'sqlite';
import Comment from '../models/comment';

export default class CommentRepository {
    database!: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async createComment(comment: Comment): Promise<void> {
        await this.database.run(`INSERT INTO COMMENT (COMMENT_ID, CONTENT, POST_ID) VALUES (?, ?, ?);`, comment.commentId, comment.content, comment.postId);

    }

    async getAllComments(id: string): Promise<Comment[]> {
        const data: Object | undefined = await this.database.all(`SELECT * FROM COMMENT WHERE POST_ID = '${id}'`);

        
        if (data == undefined) {
            throw new Error('Post inexistente');
        } else {
            const values = <Array<Object>>data;
            const lista: Array<Comment> = values.map((value) => Comment.fromMap(value));
            return lista;
        }
    }

    async getCommentById(id: string): Promise<Comment> {
        const data: Object | undefined = await this.database.get(`SELECT * FROM COMMENT WHERE COMMENT_ID = '${id}'`);

        if (data == undefined) {
            throw new Error('Comentario inexistente');
        } else {
            const comment: Comment = Comment.fromMap(data);
            console.log(comment);
            return comment;
        }
    }

    async updateComment(updatedComment: Comment) {
        const comment: Comment = await this.getCommentById(updatedComment.commentId);

        await this.database.run(
            `UPDATE COMMENT SET CONTENT = ?, COMMENT_ID = ? WHERE POST_ID = ?`,
            updatedComment.content,
            updatedComment.commentId,
            updatedComment.postId
        );
    }

    async deleteComment(id: string) {
        await this.database.run(`DELETE FROM COMMENT WHERE COMMENT_ID = ?`, id);
    }
}
