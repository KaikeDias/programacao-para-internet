export default class Post {
    id: string;
    text: string;
    likes: number;

    constructor(id: string, text: string, likes: number) {
        this.id = id;
        this.text = text;
        this.likes = likes;
    }

    static fromMap(data: Object): Post {
        const values: any[] = Object.values(data);

        return new Post(values[0], values[1], values[2]);
    }
}