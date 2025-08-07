
import { useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../useContext';
import './BookSummary.css';
import './Banner.css';



function BookSummary () {
    const [book, setBook] = useState (null);
    const { token } = useAuth ();
    const { bookid } = useParams();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    //Fetch book info by ID
    useEffect(() => {
        const fetchBook = async () => {
          try {
            const response = await axios.get(
             `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookid}`
            );
            setBook(response.data);
        }   catch (error) {
            setError('Failed to fetch book details.');
        }
      };

      fetchBook();
    }, [bookid]);

    //Reserve book
        const handleReserve = async () => {
          try {
            const response = await axios.post(
            'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations',
            { bookId: book.id },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );

        setSuccess(response.data.message || 'Book reserved successfully!');
        console.log('Reservation info:', response.data.reservation);

        //Update book state to reflect reservation 
        setBook((prev) => ({...prev, available: false }));   
      } catch (error) {
        setError('Failed to reserve book.');
        }
    };
  
    if (!book) return <p>Loading...</p>
    
    return (
      <>
        <div className="page-banner">
          <div className="banner-content">
            <h1> {book.title}</h1>
            <p>{book.author}</p>
          </div>   
        </div>  
         
      <div className="book-summary-container">
        <div className="book-cover-wrapper">
          <img src={book.coverimage} alt={book.title} className="book-cover" />
         <h2>{book.title}</h2>
        </div>
      </div>


      <div className="book-details">
        <h2>{book.title}</h2>
           <p><strong>Author:</strong>{book.author}</p>
           <p><strong>Description:</strong> {book.description}</p>
   
         <p>
           <strong>Availability:</strong>{""}
           {book.available ? (
             <span className="available"> Available</span>
           ) : (
             <span className="unavailable"> Checked Out</span>
           )}
         </p>
 
         {token && (
           <button
             className="reserve-button"
             onClick={handleReserve}
             disabled={!book.available}
          >
             {book.available ? 'Reserve' : 'Already Reserved'}
          </button>
          )}

          {error && <p className="error-message">{error}</p>}
          {success && < p className="success-message">{success}</p>}
      </div>
     </> 
    );
}
export default BookSummary

