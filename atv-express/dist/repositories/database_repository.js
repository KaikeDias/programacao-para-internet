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
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
class DatabaseRepository {
    static initialize(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new DatabaseRepository();
            repository._database = yield (0, sqlite_1.open)({ filename: name, driver: sqlite3_1.default.Database });
            yield repository._database.exec(`
        CREATE TABLE IF NOT EXISTS POST(
            POST_ID TEXT PRIMARY KEY NOT NULL,
            POST_TEXT TEXT NOT NULL,
            LIKES INT NOT NULL,
            TITLE TEXT NOT NULL,
            DATE_POST TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS COMMENT(
            COMMENT_ID TEXT PRIMARY KEY NOT NULL,
            CONTENT TEXT NOT NULL,
            POST_ID REFERENCES POST(POST_ID)
        );
        `);
            return repository;
        });
    }
    get database() {
        return this._database;
    }
    finalizar() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._database.close();
        });
    }
}
exports.default = DatabaseRepository;
