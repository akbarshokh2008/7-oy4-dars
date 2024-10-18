// import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import { createContext, useState } from 'react';
import MainLayout from './layout/MainLayout';
export default function App() {
  const ThemeContext = createContext();
  const [mode, SetMode] = useState('light');
  // const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <ThemeContext.Provider value={{ mode, SetMode }}>
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
            <MainLayout>
              <Orders />
            </MainLayout>
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
    </ThemeContext.Provider>
  );
}
