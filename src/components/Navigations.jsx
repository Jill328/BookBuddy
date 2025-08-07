import  { useNavigate } from "react-router-dom";
import { useAuth } from "../useContext";
import "./Navigations.css";
import { Link } from "react-router-dom";

const  Navigations = () => {
    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(""); //clear token
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
              <Link to="/">BookBuddy</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Catalog</Link></li>
                {token ? (
                 <>
                    <li><Link to="/account">Account</Link></li> 
                    <li><button className= "logout-button" onClick={handleLogout}>Logout</button>
                    </li> 
                </>
                ) : (
                <>
                    <li><Link to="/login">Login</Link></li>  
                    <li><Link to="/register">Register</Link></li>  
                </>
                )}      
                </ul>
            </nav>
        );
    };

export default Navigations;











