/* eslint-disable */
//import Cookies from 'js-cookie';
import Cookies from 'universal-cookie';
import { useState, useEffect, useContext, createContext } from 'react';

import { loginRequest, registerRequest, verifyTokenRequest, logoutRequest } from '../api/auth';

import axios from '../api/axios';

export const AuthContext = createContext();

//  esto es para importar con useAuth todos los datos del signup y user
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false); //para navegar al login despues del registro
  const [token, setToken] = useState('');
  //console.log(user);
  const cookies = new Cookies();
  const signup = async (user) => {
    try {
      setLoading(true);
      const res = await registerRequest(user);
      setLoading(false);
      setIsRegistered(true);
    } catch (error) {
      setErrors(error.message);
      setLoading(false);
    }
  };

  const signin = async (user) => {
    try {
      setLoading(true);
      const res = await loginRequest(user);
      const token = res.data.token;
      const username = res.data;
      const userString = JSON.stringify(username);
      // Establecer el token y el usuario en cookies
      cookies.set('token', token, {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas en milisegundos
      });
      cookies.set('user', userString, {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas en milisegundos
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('token')}`;
      console.log('cookie user', cookies.get('user'));
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.log('error login', error);

      setErrors(error.message);
      setLoading(false);
    }
  };

  const logout = () => {
    //cookies.remove('token');
    cookies.remove('user');
    cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
  };
  // esto limpia el error del input del formulario
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Efecto para cambiar isRegistered a false después de 3 segundos
  useEffect(() => {
    let timeoutId;
    if (isRegistered) {
      timeoutId = setTimeout(() => {
        setIsRegistered(false);
        setShouldNavigate(true);
      }, 3000); // 3000 milisegundos = 3 segundos
    }
    return () => clearTimeout(timeoutId); // Limpiar el temporizador al desmontar el componente
  }, [isRegistered]); // Ejecutar efecto cuando isRegistered cambie

  useEffect(() => {
    async function checkLogin() {
      const token = cookies.get('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('token')}`;
      //console.log('token', token);
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      const userCookie = cookies.get('user');
      setUser(userCookie);
      setIsAuthenticated(true);
      setLoading(false);
      setToken(cookies.get('token'));
    }
    checkLogin();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signin,
        logout,
        signup,
        loading,
        user,
        errors,
        isRegistered,
        shouldNavigate,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
