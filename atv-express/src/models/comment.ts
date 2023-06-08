export default class Comment {
    commentId: string;
    content: string;
    postId: string;

    constructor(commentId: string, content: string, postId: string) {
        this.commentId = commentId;
        this.content = content;
        this.postId = postId;
    }

    static fromMap(data: Object): Comment {
        const values: any[] = Object.values(data);

        const newCommment = new Comment(values[0], values[1], values[2]);
        return newCommment
    }   
}
