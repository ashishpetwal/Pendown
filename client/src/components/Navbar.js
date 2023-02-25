import { React, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../styles/Assets/logo.png'
const Navbar = () => {
    let location = useLocation();
    useEffect(() => {
    }, [location]);

    let navigate = useNavigate();

    const handleLogout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            navigate("/login");
        }
    }

    return (
        <>
            <nav class="navbar navbar-light bg-dark mb-4">
                <Link class="navbar-brand" to="/home">
                    <img src={logo} height="50" class="d-inline-block align-top" alt=""/>
                </Link>
                <button onClick={handleLogout} type="button" class="btn btn-primary mx-3" style={{backgroundColor:"#6c63ff"}}>Log Out</button>
            </nav>
        </>
    )
}

export default Navbar