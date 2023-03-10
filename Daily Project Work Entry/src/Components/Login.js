import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../Alert'
import globalContext from '../Context/notes/globalContext'
import './css/style.css'

const Login = () => {
    const gContext = useContext(globalContext)
    const { showAlert } = gContext;
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email.toLowerCase(), password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            showAlert("Loged in Sucessfully", 'success')
            history('/')
        }
        else {
            showAlert("Invalid Details", 'danger')
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    document.body.style.backgroundColor = '#e4e6ee'
    return (
        <>
        <Alert/>
            <div className='container  mx-auto p-5 login-style' style={{ marginTop: '120px', width: '40%' }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal py-3 fw-semibold">LOG IN</h1>
                    <div className="py-2 m-1">
                        <input type="email" className="input-border form-control" id="email" value={credentials.email.toLowerCase()} onChange={onchange} name='email' aria-describedby="emailHelp" required placeholder="Email Address" />
                    </div>
                    <div className="py-2 m-1">
                        <input type="password" className="input-border form-control" id="password" value={credentials.password} onChange={onchange} name='password' required placeholder="Password" />
                    </div>
                    <div className=" py-2 m-1">
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </div>
                    <div className=" m-1">
                        <Link className="m-1" id='label-forget' to="/emailsender">Forgot your password?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login