export default class Post {
    id: string;
    text: string;
    likes: number;
    title: string;
    datePost: Date;

    constructor(id: string, text: string, likes: number, title: string, datePost: Date) {
        this.id = id;
        this.text = text;
        this.likes = likes;
        this.title = title;
        this.datePost = datePost;
    }

    static fromMap(data: Object): Post {
        const values: any[] = Object.values(data);

        return new Post(values[0], values[1], values[2], values[3], values[4]);
    }
}