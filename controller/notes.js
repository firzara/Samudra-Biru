const db = require('../helper/database/database');
const FormatResponse = require('../helper/response');

async function GetNotes(req, res) {
    try {
        const notes = await db.query('SELECT * FROM notes');
        if (notes.length === 0) {
            FormatResponse(res, 404, "Note not found", null);
        } else {
            notes.forEach(note => {
                note.datetime = new Date(note.datetime).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            });
            FormatResponse(res, 200, "Success Get Notes", notes);
        }
    } catch (error) {
        console.error("Error in GetNotes:", error);
        FormatResponse(res, 500, "Server Error", error.message);
    }
}


async function GetNoteById(req, res) {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM notes WHERE id = ?', [id]);
        if (result.length === 0) {
            FormatResponse(res, 404, "Note not found", null);
        } else {
            result[0].datetime = new Date(result[0].datetime).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            FormatResponse(res, 200, "Success Get Note", result[0]);
        }
    } catch (error) {
        console.error("Error in GetNoteById:", error);
        FormatResponse(res, 500, "Server Error", error.message);
    }
}

async function CreateNote(req, res) {
    const { title, note, datetime } = req.body;
    try {
        const result = await db.query('INSERT INTO notes (title, note, datetime) VALUES (?, ?, ?)', [title, note, datetime]);
        FormatResponse(res, 200, "Success Create Note", null);
    } catch (error) {
        console.error("Error in CreateNote:", error);
        FormatResponse(res, 400, "Bad Request", error.message);
    }
}

async function UpdateNote(req, res) {
    const { id } = req.params;
    const { title, note } = req.body;
    try {
        const result = await db.query('UPDATE notes SET title = ?, note = ? WHERE id = ?', [title, note, id]);
        if (result.affectedRows === 0) {
            FormatResponse(res, 404, "Note not found", null);
        } else {
            FormatResponse(res, 200, "Success Update Note", null);
        }
    } catch (error) {
        FormatResponse(res, 400, "Bad Request", error.message);
    }
}

async function DeleteNote(req, res) {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM notes WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            FormatResponse(res, 404, "Note not found", null);
        } else {
            FormatResponse(res, 200, "Success Delete Note", null);
        }
    } catch (error) {
        FormatResponse(res, 400, "Bad Request", error.message);
    }
}

module.exports = { GetNotes, GetNoteById, CreateNote, UpdateNote, DeleteNote };
