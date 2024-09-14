import { title } from 'node:process';
import { Note, db } from './database'

interface NoteTreeNode {
    id: number;
    title: string;
    opened: boolean;
    children: NoteTreeNode[];
}

// TODO Open tree to specific note (from argument)
export async function getNoteTree(noteId?: number): Promise<NoteTreeNode[]> {
    if (noteId === undefined) {
        const list = await db.selectFrom("notes").select(["id", "title"]).execute();
        return list.map((entry) => {
            return {
                id: entry.id,
                title: entry.title,
                opened: false,
                children: []
            }
        });
    } else {
        return []
    }
}