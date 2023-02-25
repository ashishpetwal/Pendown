import { React, useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = [];

    const [notes, setnotes] = useState(initialNotes)

    // FETCH ALL NOTES

    const getNotes = async () => {
        // API Call
        const url = `${host}/api/notes/fetchnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setnotes(json);
    }

    // Add a Note
    const addNote = async (title, description, tags) => {
        // API Call
        const url = `${host}/api/notes/addnote/`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tags })
        });

        const note = await response.json();
        setnotes(notes.concat(note));
    }

    // Delete a Note
    const deleteNote = async (id) => {
        alert("Your Note has been deleted successfully!")
        // API Call
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': localStorage.getItem('token')
            },
        });

        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes);
    }
    // Edit a Note
    const editNote = async (id, title, description, tags) => {
        // API Call
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tags })
        });
        const result = response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tags = tags;
                break;
            }
        }
        setnotes(newNotes);
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState
