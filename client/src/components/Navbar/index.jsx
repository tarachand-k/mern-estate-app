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
        <a className="logo">
          <img src="/logo.png" alt="logo" />
          <span>Estate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
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
            <a href="/sign-in" className="login-btn">
              Sign in
            </a>
            <a href="/sign-up" className="register-btn">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon" onClick={handleToggleMenu}>
          <img src="/menu.png" alt="Menu icon" />
        </div>
        <div className={`menu ${isMenuOpen ? "open" : undefined}`}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
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
              <a href="/sign-in" className="login-btn">
                Sign in
              </a>
              <a href="/sign-up" className="register-btn">
                Sign up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
