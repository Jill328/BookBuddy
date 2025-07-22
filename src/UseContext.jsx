import  { useState, useEffect, createContext, useContext, useCallback } from 'react';
//import bookLogo from './assets/books.png'
import axios from 'axios';
import PropTypes from 'prop-types';


export const AuthContext = createContext();

export const AuthProvider = ({children})=> {
  const [token, setToken] = useState(localStorage.getItem('token') ||'');
  const [user, setUser] = useState(null);
  const [apiMessage, setApiMessage] = useState("Success");

const fetchUser = useCallback(async (authToken = token) => {
    try {
    const response = await axios.get(
       'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me',
   {
    headers: {
        Authorization: `Bearer ${authToken}`,
            },
        } 
    );
    setUser(response.data);
    console.log("User data:", response.data);
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    }
}, [token]);

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token, fetchUser]);

    const login = async (loginUser) => {
    try {
        const response = await axios.post(
         'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login',loginUser,
         {
          headers:{
            'Content-Type': 'application/json',
           },
         }
        );

        const receivedToken = response.data.token; 
        setToken(receivedToken); 
        localStorage.setItem('token', receivedToken);
        setApiMessage('Login successful');
        fetchUser(receivedToken);
      } catch (error) {
        setApiMessage(error?.response?.data?.message || 'Login failed'); 
        throw error;
      }
    };
    
    const register = async (newUser)=> {
    try {
        const response = await axios.post('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register',newUser,
        {
         headers: {
          'Content-Type': 'application/json',
          },
         }
        );
        const receivedToken = response.data.token;
        setToken(receivedToken);
        localStorage.setItem('token', receivedToken);
        setApiMessage('You are registered');
        fetchUser(receivedToken);
      } catch (error) {
        setApiMessage(error?.response?.data?.message || 'Register failed');  
        }
    };

  return (
    <AuthContext.Provider value ={{ user, token, login, register, apiMessage }}>
      {children}
    </AuthContext.Provider>
   )}

  AuthProvider.propTypes ={
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
