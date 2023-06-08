"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Post {
    constructor(id, text, likes, title, datePost) {
        this.id = id;
        this.text = text;
        this.likes = likes;
        this.title = title;
        this.datePost = datePost;
    }
    static fromMap(data) {
        const values = Object.values(data);
        return new Post(values[0], values[1], values[2], values[3], values[4]);
    }
}
exports.default = Post;
