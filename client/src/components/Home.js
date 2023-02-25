import React from 'react'
import AddNote from './AddNote';
import Notes from './Notes'
import img from '../styles/Assets/notes.svg'
import Navbar from './Navbar';

const Home = (props) => {
  const { showAlert } = props;
  return (
    <>
    <Navbar/>
      <div className="homepage">
        <div className="noteitems">
          <div><h2>Notes</h2></div>
          <div className="notes">
            <Notes showAlert={showAlert} />
          </div>
        </div>
        <div className="addnote">
          <div><img src={img} alt="" /></div>
          <AddNote />
        </div>
      </div>
    </>
  )
}

export default Home