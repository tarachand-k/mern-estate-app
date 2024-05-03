import "./layout.scss";

import Navbar from "./components/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export function ProtectedLayout() {
  const { user } = useAuth();

  return !user ? (
    <Navigate to="/sign-in" />
  ) : (
    <div className="layout">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
