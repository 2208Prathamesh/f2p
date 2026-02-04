import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, login, logout, signup } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((current) => setUser(current))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async (payload) => {
        const logged = await login(payload);
        setUser(logged);
        return logged;
      },
      signup: async (payload) => {
        const created = await signup(payload);
        setUser(created);
        return created;
      },
      logout: async () => {
        await logout();
        setUser(null);
      },
      setUser,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
