import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { setToken, removeToken, getToken } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      // Verificar validade ou decodificar
      api.defaults.headers.Authorization = `Bearer ${token}`;
      // Opcional: buscar perfil
      setUser({ token }); // simplificado
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    setToken(token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    delete api.defaults.headers.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);