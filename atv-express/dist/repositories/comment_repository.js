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
const comment_1 = __importDefault(require("../models/comment"));
class CommentRepository {
    constructor(database) {
        this.database = database;
    }
    createComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.exec(`INSERT INTO COMMENT(COMMENT_ID,CONTENT,POST_ID) VALUES('${comment.commentId}','${comment.content}','${comment.postId}')`);
        });
    }
    getAllComments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.database.all(`SELECT * FROM COMMENT WHERE POST_ID = '${id}'`);
            if (data == undefined) {
                throw new Error('Post inexistente');
            }
            else {
                const values = data;
                const lista = values.map((value) => comment_1.default.fromMap(value));
                return lista;
            }
        });
    }
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.database.get(`SELECT * FROM COMMENT WHERE COMMENT_ID = '${id}'`);
            if (data == undefined) {
                throw new Error('Comentario inexistente');
            }
            else {
                const comment = comment_1.default.fromMap(data);
                console.log(comment);
                return comment;
            }
        });
    }
    updateComment(updatedComment) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.getCommentById(updatedComment.commentId);
            yield this.database.exec(`UPDATE COMMENT SET CONTENT = '${updatedComment.content}', COMMENT_ID = ${updatedComment.commentId} WHERE POST_ID = '${updatedComment.postId}'`);
        });
    }
    deleteComment(deletedComment) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.getCommentById(deletedComment.commentId);
            const id = comment.commentId;
            yield this.database.exec(`DELETE FROM COMMENT WHERE COMMENT_ID = '${id}'`);
        });
    }
}
exports.default = CommentRepository;
