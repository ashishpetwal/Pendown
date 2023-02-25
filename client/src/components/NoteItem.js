import {React, useContext} from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext)
    const {deleteNote} = context;
    const { notes,updateNote } = props;
    return (
        <div className="noteitem" tabIndex={1}>
            <div><h5>{notes.title}</h5></div>
            <div><p className='desc'>{notes.description}</p></div>
            <div><p className='tags'>{notes.tags}</p></div>
            <div className="icons">
                <div><i className='fas fa-edit' onClick={()=>{updateNote(notes)}}></i></div>
                <div><i className='fas fa-trash' onClick={()=>{deleteNote(notes._id)}}></i></div>
            </div>
        </div>
    )
}

export default NoteItem