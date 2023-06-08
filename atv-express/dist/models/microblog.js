"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MicroBlog {
    constructor() {
        this.Posts = [];
    }
    create(post) {
        this.Posts.push(post);
        return post;
    }
    retrieve(id) {
        const post = this.Posts.find((post) => post.id === id);
        return post ? post : null;
    }
    update(updatedPost) {
        const index = this.Posts.findIndex((post) => post.id === updatedPost.id);
        if (index !== -1) {
            this.Posts[index] = updatedPost;
            return updatedPost;
        }
        else {
            return null;
        }
    }
    delete(id) {
        const postIndex = this.Posts.findIndex((post) => post.id === id);
        if (postIndex !== -1) {
            const deleted = this.Posts.splice(postIndex, 1);
            return deleted[0];
        }
        else {
            return null;
        }
    }
    retrieveAll() {
        return this.Posts;
    }
}
exports.default = MicroBlog;
