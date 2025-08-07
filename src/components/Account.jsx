import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../useContext";
import "./Account.css";


function Account() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
 

  useEffect(() => {
    if (!token) return;
    
    const fetchUserAndReservations = async () => {
      try {
        console.log("Token being sent:", token);
      
        //fetch user info
        const userResponse = await axios.get(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
          
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("User API Response:", userResponse.data);
        setUser(userResponse.data);
        
        //fetch reservations from API
        const reservationsResponse = await axios.get(
            "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
            { 
            headers: { Authorization: `Bearer ${token}` }
            }
        );
        console.log("Reservations API Full Response:", reservationsResponse.data);
        console.log("Reservations API Keys:", Object.keys(reservationsResponse.data));

        
        const rawReservations = reservationsResponse.data.reservations || reservationsResponse.data || [];
        

        const reservationsData = rawReservations.map((res) => ({
           ...res,
            book: res.book 
            ? {
               title: res.book.title || "Unknown Title",
               author: res.book.author || "Unknown Author",
               coverImage: 
                res.book.coverImage || 
                res.book.coverimage ||
                "https://via.placeholder.com/60x90?text=No+Image",
              }
        : {
          title: res.title || "Unknown Title",
          author: res.author || "Unknown Author",
          coverImage: 
            res.coverImage ||
            res.coverimage ||
          "https://via.placeholder.com/60x90?text=No+Image",
          },
      
      }));
  
        setReservations(reservationsData);    
      } catch (error) {
        console.error(
          "Failed to fetch user or reservations:", 
          error.response?.data || error.message);
        setError("Failed to fetch account information");
      }
  };
     fetchUserAndReservations();  
  }, [token]);

    useEffect(() => {
    console.log("Updated reservations state:", reservations);
    }, [reservations]);
 
  //handle book return

  const handleReturn = async (reservationId) => {
    const previousReservations = [...reservations];
    setReservations((prev) => prev.filter((res) => res.id !== reservationId));
    try {
      console.log(`Attempting to return reservation with ID ${reservationId}`);
      await axios.delete(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,

         { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("book returned successfully");
    } catch (err) {
      console.error("Failed to return book:", err);
      setError("Failed to return book");
      setReservations(previousReservations); 
    }
  };

  if (!token) {
    return (
      <div className="account-container">
        <div className="account-header">
          <h1>Access Denied</h1>
          <p>Please log in or register to access your account.</p>
          <Link to="/login">Log In</Link> or
          <Link to="/register">Register</Link>
        </div>
      </div>
    );
  }

  if (error) return <p className="error-message">{error}</p>;
  if (!user) return <p className="loading-message">Loading...</p>;

  return (
    <div className="account-container">
       
        <div className="account-header">
        <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
    </div>

    <div className="reservations-section">
      <h3>My Reservations</h3>
        {reservations.length > 0 ? (
          <ul className="reservations-list">
            {reservations .map((res) => (
              <li key={res.id} className="reservation-item">
                <div className="reservation-thumbnail">
                    <img
                        src={res.book?.coverImage || "https://via.placeholder.com/60x90?text=No+Image"}
                        alt={res.book?.title || "No Title"}
                      />
                </div>
                <div className="reservation-info">
                  <h4>{res.book?.title || "Unknown Title"}</h4>
                  <p>by {res.book?.author || "Unknown Author"}</p> 
                  <button
                    className="return-button"
                    onClick={() => handleReturn(res.id)}
                    >
                      Return
                    </button>
                   </div>
                  </li>                   
                ))}
            </ul>
           ) : (
             <p className="no-reservations-message">No reservations found.</p>
            )}
        </div>
    </div>  
  );
}

export default Account;
