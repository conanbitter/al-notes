import { title } from 'node:process';
import { Note, db } from './database'

interface NoteTreeNode {
    id: number;
    title: string;
    opened: boolean;
    children: NoteTreeNode[];
}

export async function getNoteTree(): Promise<NoteTreeNode[]> {
    const list = await db.selectFrom("notes").select(["id", "title"]).execute();
    return list.map((entry) => {
        return {
            id: entry.id,
            title: entry.title,
            opened: false,
            children: []
        }
    });
}