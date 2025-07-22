import  { Link } from "react-router-dom";
import "./Navigations.css";

const  Navigations = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo">
              <Link to="/">BookBuddy</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Catalog</Link></li>
                <li><Link to="/account">Account</Link></li>  
                <li><Link to="/login">Login</Link></li>  
                <li><Link to="/register">Register</Link></li>        
                </ul>
        </nav>
    )
}

export default Navigations











