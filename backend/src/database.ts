import { Generated, Selectable, Insertable, Updateable, SqliteDialect, Kysely } from 'kysely'
import SQLite from 'better-sqlite3'
import path from 'node:path'

export interface Database {
    notes: NotesTable;
}

export interface NotesTable {
    id: Generated<number>;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export type Note = Selectable<NotesTable>;
export type NewNote = Insertable<NotesTable>;
export type NoteUpdate = Updateable<NotesTable>;

const dialect = new SqliteDialect({
    database: new SQLite(path.join(__dirname, "../web/data.db")),
})

export const db = new Kysely<Database>({
    dialect,
})