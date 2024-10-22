import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import { createContext, useEffect, useState } from 'react';
import MainLayout from './layout/MainLayout';
import Checkout from './pages/Checkout';

export const CartContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('darkmode') === 'true';
  });
  const [cart, setCart] = useState([]);

  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('darkmode', mode);
  }, [mode]);

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    } else {
      if (
        !(
          location.pathname == '/' ||
          location.pathname.includes('register') ||
          location.pathname.includes('about') ||
          location.pathname.includes('products') ||
          location.pathname.includes('cart')
        )
      ) {
        navigate('/login');
      }
    }
  }, [navigate]);
  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate('/login');
    }
    return children;
  }

  return (
    <ThemeContext.Provider value={[mode, setMode]}>
      <CartContext.Provider value={[cart, setCart]}>
        <Routes>
          <Route
            path='/'
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          ></Route>
          <Route
            path='/about'
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          ></Route>
          <Route
            path='/products'
            element={
              <MainLayout>
                <Products />
              </MainLayout>
            }
          ></Route>
          <Route
            path='/cart'
            element={
              <MainLayout>
                <Cart />
              </MainLayout>
            }
          ></Route>
          <Route
            path='/orders'
            element={
              <PrivateRoute isAuth={!!token}>
                <MainLayout>
                  <Orders />
                </MainLayout>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path='/checkout'
            element={
              <PrivateRoute isAuth={!!token}>
                <MainLayout>
                  <Checkout />
                </MainLayout>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path='/products/:id'
            element={
              <MainLayout>
                <Details />
              </MainLayout>
            }
          ></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}
