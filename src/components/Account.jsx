import { useEffect, useState } from 'react';
import  axios from 'axios';
//import { AuthContext} from '../UseContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../UseContext';
import './Account.css'
import './Banner.css';



function Account () {
    const { user, token } = useAuth();
    const [reservations, setReservations] = useState([]);
    const[error, setError] = useState('');

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await axios.get(
                    'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setReservations(res.data);
            } catch (err) {
                setError('Could not fetch reservations.');
            }
        };
        
        if (token) {
            fetchReservations();
        }
    }, [token]);

    //Return a book
    const handleReturn = async (reservationId) => {
        try {
         await axios.delete(
            `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
            {
            headers: {
             Authorization: `Bearer ${token}`,
                    },
            }
            );

        //Update UI
        setReservations((prev) => prev.filter((res) => res.id !== reservationId));
        } catch (err) {
        setError ('Failed to return book.');
        }
    };  

    if (!token) {
        return (
            <div>
                <p>You must be logged in to view your account</p>
                <Link to="/login">Log In</Link> or <Link to="/register">Register</Link>
            </div>
        );
    }
   
    return (
     <div className="page-banner">
       <div className="page-content">
        <h1>My Account</h1>
        {user && (
          <div className="user-details">
    
            <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
    )}

        <h3>My Reservations</h3>
        {reservations.length === 0? (
            <p>You have no reserved books.</p>
        ) : (
          <ul className="reservation-list">
            {reservations.map((res) => (
                <li key={res.id} className="reservation-item">
                    <strong>{res.title}</strong> by {res.author}
                    <button onClick={() => handleReturn(res.id)}>Return</button>
                </li>
            ))}
          </ul>
        )}

        {error && <p className="error-message"></p>}
        </div>
    </div>
    );
}
    


export default Account;
