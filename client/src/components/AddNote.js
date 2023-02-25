import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext, useState} from 'react';

function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setnote] = useState({title:"Write down your Ideas...",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",tags:"Enter Tag"});

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tags);
        setnote({id:"",title:"",description:"",tags:""});
        props.showAlert("Added Note Successfully","primary");
    }

    const onchange = (e)=>{
        setnote({...note, [e.target.name]:e.target.value});
    }

    return (
        <div className='addNote-fields'>
            <input type="text" value={note.title} onChange={onchange} name='title' placeholder='Enter Note Title' />
            <textarea type="text" value={note.description} onChange={onchange} name='description' placeholder='Enter Note Description' />
            <input type="text" value={note.tags} onChange={onchange} name='tags' placeholder='Enter Note Tag' />
            <button type="submit" onClick={handleClick}>Add Note</button>
        </div>
    )
}

export default AddNote