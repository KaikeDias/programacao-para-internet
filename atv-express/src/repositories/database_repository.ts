import { open, Database } from "sqlite";
import  sqlite3  from "sqlite3";

export default class DatabaseRepository {
    private _database!: Database

    static async initialize(name: string): Promise<DatabaseRepository> {
        const repository: DatabaseRepository = new DatabaseRepository()
        repository._database = await open({filename: name, driver: sqlite3.Database})

        await repository._database.exec(`
        CREATE TABLE IF NOT EXISTS POST(
            POST_ID TEXT PRIMARY KEY NOT NULL,
            POST_TEXT TEXT NOT NULL,
            LIKES INT NOT NULL 
        )
        `);

        return repository;
    }

    get database() {
        return this._database
    }
    
    async finalizar(): Promise<void> {
        await this._database.close()
    }
}