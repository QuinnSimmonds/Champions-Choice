import { createContext, useContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Restore user from localStorage on page refresh
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.username && parsed.role) {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.error("Error restoring user:", err);
      localStorage.removeItem("user");
    }
  }, []);

  // ✅ Stable login function
  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  // ✅ Stable logout function
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook for consuming the context
export const useAuth = () => useContext(AuthContext);