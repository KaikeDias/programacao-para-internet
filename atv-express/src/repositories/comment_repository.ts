import { Database } from "sqlite";
import Comment from "../models/comment";

export default class CommentRepository {
    database!: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async createComment(comment: Comment): Promise<void> {
        await this.database.exec(`INSERT INTO COMMENT(COMMENT_ID,CONTENT,POST_ID) VALUES('${comment.commentId}','${comment.content}','${comment.postId}')`);
    }

    async getAllComments(id: string): Promise<Comment[]> {
        const data: Object | undefined = await this.database.all(`SELECT * FROM COMMENT WHERE POST_ID = '${id}'`);

        if (data == undefined) {
            throw new Error('Post inexistente')
        } else {
            const values = <Array<Object>>data;
            const lista: Array<Comment> = values.map((value) => Comment.fromMap(value))
            return lista;
        }
    }

    async getCommentById(id: string) {
        const data: Object | undefined = await this.database.get(`SELECT * FROM COMMENT WHERE COMMENT_ID = '${id}'`)

        if (data == undefined) {
            throw new Error('Comentario inexistente')
        } else {
            const comment: Comment = Comment.fromMap(data);
            console.log(comment)
            return comment;
        }
    }

    async updateComment(updatedComment: Comment) {
        const comment: Comment = await this.getCommentById(updatedComment.commentId);

        await this.database.exec(`UPDATE COMMENT SET CONTENT = '${updatedComment.content}', COMMENT_ID = ${updatedComment.commentId} WHERE POST_ID = '${updatedComment.postId}'`);
    }

    async deleteComment(deletedComment: Comment) {
        const comment: Comment = await this.getCommentById(deletedComment.commentId);
        const id: String = comment.commentId;

        await this.database.exec(`DELETE FROM COMMENT WHERE COMMENT_ID = '${id}'`);
    }
}