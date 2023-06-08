"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Comment {
    constructor(commentId, content, postId) {
        this.commentId = commentId;
        this.content = content;
        this.postId = postId;
    }
    static fromMap(data) {
        const values = Object.values(data);
        return new Comment(values[0], values[1], values[2]);
    }
}
exports.default = Comment;
