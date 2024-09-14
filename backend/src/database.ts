import { Generated, Selectable, Insertable, Updateable } from 'kysely'

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

export type Notes = Selectable<NotesTable>;
export type NewNote = Insertable<NotesTable>;
export type NoteUpdate = Updateable<NotesTable>;