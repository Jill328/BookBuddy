import "./Banner.css";
import { useAuth } from "../useContext";

function Banner() {
  const { user } = useAuth();
  return (
    <div className="page-bannner">
      <div className="page-content">
        <h1>My Account</h1>
        {user && (
          <div className="user-details">
            <p>
              <strong>Name:</strong> {user.firstname} {user.lastname}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Banner;
