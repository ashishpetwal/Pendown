import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes(props) {
    const context = useContext(noteContext);
    const { notes, addNotes, getNotes, editNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null);

    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etags:""});

    const updateNote = (currentNote) => {
        ref.current.click(); 
        setnote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description , etags:currentNote.tags});
    }

    const onchange = (e)=>{
        setnote({...note, [e.target.name]:e.target.value});
    }

    const handleClick = (e)=>{
        editNote(note.id, note.etitle,note.edescription,note.etags);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }

    return (
        <>
            {/* <AddNote showAlert={props.showAlert} /> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tags" className="form-label">Tags</label>
                                    <input type="text" className="form-control" id="etags" name="etags" value={note.etags} onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3 notes'>
                <div className='container'>
                    {notes.length===0 && "No Notes to display !"}
                </div>
                {notes.map((notes) => {
                    return( 
                    <div key={notes._id}>
                        <NoteItem key={notes._id} updateNote={updateNote} notes={notes} showAlert={props.showAlert}/>
                    </div>
                    )
                })}
            </div>
        </>
    )
}

export default Notes