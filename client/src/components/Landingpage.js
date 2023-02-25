import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../styles/Assets/logo.png'
import img from '../styles/Assets/note-taking.svg'
import about from '../styles/Assets/about.svg'

const Landingpage = () => {
  return (
    <>
      <div className="header">
        <div className="navbar">
          <div className="logo">
            <img src={logo} style={{ height: "64px" }} alt="" />
          </div>
          <div className="nav-menu">
            <li>HOME</li>
            <li>ABOUT US</li>
            <li>CONTACT US</li>
          </div>
          <div className="login-btn">
            <Link to='/login'><button>Login</button></Link>
          </div>
        </div>
        <div className="head-content">
          <div className="head-text">
            <h2>Create <span className='organize'>Organize</span> Share <span className='easy'>Easy...</span></h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non tenetur repudiandae voluptatibus ex sint et consectetur aperiam porro consequatur molestiae?</p>
            <div className="btns">
              <div className="btn-1"><Link to="/signup"><button>Try for Free</button></Link></div>
              <div className="btn-2"><button>See How it Works</button></div>
            </div>
          </div>
          <div className="head-img">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
      <div className="about-us">
        <div><h2>About Pendown</h2></div>
        <div className="about-item">
          <div className="about-img">
            <img src={about} alt="" />
          </div>
          <div className="about-text">
            <p>Pendown is a simple solution to takes notes. It is a ReactJS based project which uses Node JS and Express.js at backend and MongoDB as its Database.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landingpage