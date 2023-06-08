"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroBlogPersistente = void 0;
const post_1 = __importDefault(require("../models/post"));
class MicroBlogPersistente {
    constructor(database) {
        this.database = database;
    }
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.exec(`INSERT INTO POST(POST_ID,POST_TEXT,LIKES,TITLE,DATE_POST) VALUES('${post.id}','${post.text}', ${post.likes}, ${post.title}, ${post.datePost.toISOString()})`);
        });
    }
    retrievePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.database.get(`SELECT * FROM POST WHERE POST_ID = '${id}'`);
            if (data == undefined) {
                throw new Error('Post inexistente');
            }
            else {
                const post = post_1.default.fromMap(data);
                return post;
            }
        });
    }
    updatePost(updatedPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.retrievePost(updatedPost.id);
            yield this.database.exec(`UPDATE POST SET POST_TEXT = '${updatedPost.text}', LIKES = ${updatedPost.likes} WHERE POST_ID = '${updatedPost.id}'`);
        });
    }
    removerPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.exec(`DELETE FROM POST WHERE POST_ID = '${id}'`);
        });
    }
    retrieveAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.database.all(`SELECT * FROM POST`);
            if (data == undefined) {
                throw new Error('Post inexistente');
            }
            else {
                const values = data;
                const lista = values.map((value) => post_1.default.fromMap(value));
                return lista;
            }
        });
    }
}
exports.MicroBlogPersistente = MicroBlogPersistente;
