import Post from "./post";

export default class MicroBlog {
    Posts: Post[];

    constructor() {
        this.Posts = []
    }

    create(post: Post): Post {
        this.Posts.push(post);

        return post;
    }

    retrieve(id: string): Post | null {
        const post =  this.Posts.find((post) => post.id === id);
        return post ? post : null;
    }

    update(updatedPost: Post): Post | null {
        const index = this.Posts.findIndex((post) => post.id === updatedPost.id);
    
        if (index !== -1) {
          this.Posts[index] = updatedPost;
          return updatedPost;
        } else {
          return null;
        }
    }

    delete(id: string): Post | null {
        const postIndex = this.Posts.findIndex((post) => post.id === id);
      
        if (postIndex !== -1) {
          const deleted = this.Posts.splice(postIndex, 1);
          return deleted[0];
        } else {
          return null;
        }
    }

    retrieveAll(): Post[] {
        return this.Posts;
    }
}