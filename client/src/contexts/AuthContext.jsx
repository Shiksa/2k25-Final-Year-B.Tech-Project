import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authToken = params.get('token');
    const name = params.get('name');
    const email = params.get('email');
    const picture = params.get('picture');

    if (authToken) {
      // Save token and user data to local storage and state
      setToken(authToken);
      localStorage.setItem('access_token', authToken);

      const userData = { name, email, picture };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      setIsAuthenticated(true);

      // Clear token and user info from URL
      window.history.replaceState({}, document.title, '/');
    } else {
      // Check local storage for existing token and user
      const storedToken = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);


  const handleLogin = () => {
    // Redirect to Google OAuth login
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const handleLogout = () => {
    // Clear local storage and state
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('access_token', authToken);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, handleLogin, handleLogout, handleLoginSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
