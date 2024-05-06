import { useEffect, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useNotificationStore } from "../../lib/notification-store";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const number = useNotificationStore((state) => state.number);
  console.log(number);
  const fetch = useNotificationStore((state) => state.fetch);

  useEffect(() => {
    fetch();
  }, [fetch]);

  function handleToggleMenu() {
    setIsMenuOpen((curr) => !curr);
  }

  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>Estate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>
      <div className="right">
        {user ? (
          <>
            <Link className="user" to={"/profile"}>
              <img src={user.avatar || "/noavatar.jpg"} alt="" />
              <span>{user.username}</span>
            </Link>
            <Link to="/profile" className="profile-btn">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-in" className="login-btn">
              Sign in
            </Link>
            <Link to="/sign-up" className="register-btn">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon" onClick={handleToggleMenu}>
          <img src="/menu.png" alt="Menu icon" />
        </div>
        <div className={`menu ${isMenuOpen ? "open" : undefined}`}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>
          {user ? (
            <Link
              to="/profile"
              className="profile-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          ) : (
            <>
              <Link to="/sign-in" className="login-btn">
                Sign in
              </Link>
              <Link to="/sign-up" className="register-btn">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
