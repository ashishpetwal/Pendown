import { React, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import img from '../styles/Assets/login.svg'

const Login = (props) => {

    const [cred, setcred] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.secToken)
            navigate("/home");
            props.showAlert("Successfully Logged In", "success");
        }
        else {
            props.showAlert("Invalid Credentials!", "danger")
        }
    }

    const onchange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="login-container">
                <div className="login-image">
                    <img src={img} alt="" />
                </div>
                <div className="login-details">
                    <div><h2>Log In</h2></div>

                    <div><i className='fas fa-user'></i><input type="email" placeholder='Enter your Email' name='email' value={cred.email} onChange={onchange} required /></div>

                    <div><i className='fas fa-lock'></i><input type="password" placeholder='Enter your Password' name='password' value={cred.password} onChange={onchange} required /></div>

                    <div><button type="submit" onClick={handleSubmit}>Log In</button></div>

                    <div>Or <Link to="/signup">Create an account</Link></div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Link style={{color:"black"}} to="/">Go to Home</Link>
            </div>
        </>
    )
}

export default Login