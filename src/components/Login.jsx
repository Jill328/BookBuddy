import { useNavigate } from 'react-router-dom'
//import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext} from "../useContext";
import './Login.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Banner.css';


const MySwal = withReactContent(Swal);

function Login () {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [formObject, setFormObject]= useState({
        email :"",
        password :"",
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormObject((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            await login(formObject);
            navigate('/');
        }   catch (err) {
            MySwal.fire({
              title: <strong>Login Failed</strong>,
              html:<i>Account not found. Would you like to create one?</i>,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Register',
              cancelButtonText: 'Cancel',
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/register');
              }
            });
        }
    };

    
    return (
     <div className="login-container">
       <h1>Please Login</h1>
        <form className = "login-form" onSubmit={handleSubmit}>
            <div>
             <label htmlFor= "email" >Email</label>
            <input 
              id="email"
              name = "email"
              type = "email"
              value= {formObject.email} 
              onChange={handleChange}
            />
            </div>
                    
            <div>
              <label htmlFor= "password">Password</label>
              <input 
                id="password"
                name = "password"
                type= "password"
                value = {formObject.password} 
                onChange={handleChange}
                />    
            </div>
                           
            <div className="login-buttons">
             <button type="submit">Login</button> 
                <button type="button" onClick={() =>navigate('/register')}>Make a new account
             </button>
            </div>
        </form>
    </div>
    );
}

export default Login;













