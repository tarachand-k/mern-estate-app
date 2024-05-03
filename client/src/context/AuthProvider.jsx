import React, { useEffect } from "react";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  function updateUser(data) {
    setUser(data);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context)
    throw new Error(
      "Context value should be used within AuthProvider component"
    );

  return context;
}

export default AuthProvider;
