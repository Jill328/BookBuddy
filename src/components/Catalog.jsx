import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Catalog.css';
import './Banner.css';
import Banner from './Banner';


function Catalog () {
    const [books, setBooks]=useState ([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(()=>{
        const getBooks = async ()=>{
            const response = await axios ('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
            console.log(response.data)
            setBooks(response.data);
        };
        getBooks();
},[]);
    
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
    <>
        <Banner title="Welcome to BookBuddy"
            subtitle= "Explore our growing digital catalog." 
            />

        <div className="search-bar">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="catalog-grid">
                {filteredBooks.slice(0, 50).map(book=> (
                <Link to={`/books/${book.id}`} 
                key={book.id} 
                className="book-card">
                <img src={book.coverimage} 
                alt = {book.title} className="book-cover" />
                <h4>{book.title}</h4>
                </Link>
            ))}
        
        </div>
    </> 
    );   

}

export default Catalog













