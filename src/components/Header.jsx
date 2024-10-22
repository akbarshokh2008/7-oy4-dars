import React, { useEffect, useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';
// IMG
import Sun from '../img/sun.svg';
import Moon from '../img/moon.svg';
import Cart from '../img/cart.svg';
import CartDark from '../img/cart-dark.svg';
import { CartContext, ThemeContext } from '../App';

export default function Header() {
  const [cart, setCart] = useContext(CartContext);
  const [mode, setMode] = useContext(ThemeContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let sum = 0;
    cart.forEach((c) => {
      sum += Number(c.amount);
    });
    setCount(sum);
  }, [cart]);

  function handleDark() {
    setMode(!mode);
  }
  return (
    <div className={mode ? 'dark' : ''}>
      <div className='bg-[#0c0c32] dark:bg-[#3c3c4f]'>
        <div className='ruyxatdan flex  items-center justify-end text-white   my-container  gap-6 py-2'>
          {localStorage.getItem('token') ? (
            <p className='text-white'>Hello, coder</p>
          ) : (
            <Link to='/login' className='hover:underline'>
              Sign in / Guest
            </Link>
          )}
          {localStorage.getItem('token') ? (
            <Link
              to='/login'
              className='py-1 px-2 rounded-xl border-2 dark:border-pink-500 dark:text-pink-500 dark:hover:bg-pink-500 dark:hover:text-[#301C27]   border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 '
            >
              LOGOUT
            </Link>
          ) : (
            <Link to='/register' className='hover:underline'>
              Create Accaunt
            </Link>
          )}
        </div>
      </div>

      <div className='bg-blue-100 dark:bg-[#181920]'>
        <header className='my-container flex justify-between py-2'>
          <div className='logo py-2 px-5 text-3xl font-bold dark:bg-[#FF7AC6] hover:dark:bg-[#db56a2] cursor-pointer hover:bg-blue-400 rounded-md text-white dark:text-[#301C27] bg-blue-500'>
            C
          </div>
          <nav className='nav flex items-center gap-5'>
            <NavLink
              to='/'
              className='navlink py-2 px-5 rounded-lg  text-[#394E6A] dark:text-white '
            >
              Home
            </NavLink>
            <NavLink
              to='/about'
              className=' py-2 px-5 rounded-lg  text-[#394E6A] dark:text-white '
            >
              About
            </NavLink>
            <NavLink
              to='/products'
              className=' py-2 px-5 rounded-lg  text-[#394E6A] dark:text-white '
            >
              Products
            </NavLink>
            <NavLink
              to='/cart'
              className=' py-2 px-5 rounded-lg  text-[#394E6A] dark:text-white '
            >
              Cart
            </NavLink>
            {localStorage.getItem('token') && (
              <NavLink
                to='/checkout'
                className=' py-2 px-5 rounded-lg  text-[#394E6A] dark:text-white '
              >
                Checkout
              </NavLink>
            )}
            {localStorage.getItem('token') && (
              <NavLink
                to='/orders'
                className=' py-2 px-5 rounded-lg  text-[#394E6A] dark:text-white '
              >
                Orders
              </NavLink>
            )}
          </nav>
          <div className='mode flex gap-5 items-center'>
            <button onClick={handleDark}>
              {mode ? (
                <img
                  src={Sun}
                  alt='sun rasmi'
                  className='cursor-pointer
            '
                />
              ) : (
                <img
                  src={Moon}
                  alt='moon rasmi'
                  className='cursor-pointer
            '
                />
              )}
            </button>

            <Link
              to='/cart'
              className='cursor-pointer relative
            '
            >
              {mode ? (
                <img
                  src={CartDark}
                  alt='cart rasmi'
                  width={45}
                  className='p-2 dark:hover:bg-gray-600 rounded-full'
                />
              ) : (
                <img
                  src={Cart}
                  alt='cart rasmi'
                  width={45}
                  className='p-2  hover:bg-slate-300  rounded-full'
                />
              )}

              <span className='flex items-center justify-center text-[12px]  w-4 h-4 bg-blue-500 text-white rounded-lg px-3  absolute top-[-5px] right-[-5px]'>
                {count}
              </span>
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
}
