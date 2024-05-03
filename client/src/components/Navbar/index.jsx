import { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  console.log(user);

  function handleToggleMenu() {
    setIsMenuOpen((curr) => !curr);
  }

  return (
    <nav className="navbar">
      <div className="left">
        <a className="logo">
          <img src="/logo.png" alt="logo" />
          <span>TaraEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {user ? (
          <>
            <div className="user">
              <img src={user.avatar || "/noavatar.jpg"} alt="" />
              <span>{user.username}</span>
            </div>
            <Link to="/profile" className="profile-btn">
              <div className="notification">3</div>
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
          <a href="/sign-in">Sign in</a>
          <a href="/sign-up">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
