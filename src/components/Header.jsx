import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';
// IMG
// import Sun from '../img/sun.svg';
import Moon from '../img/moon.svg';
import Cart from '../img/cart.svg';

export default function Header() {
  return (
    <div className=''>
      <div className='bg-[#0c0c32] dark:bg-[#3c3c4f]'>
        <div className='ruyxatdan flex justify-end text-white   my-container  gap-6 py-2'>
          <Link to='/login' className='hover:underline'>
            Sign in / Guest
          </Link>
          <Link to='/register' className='hover:underline'>
            Create Accaunt
          </Link>
        </div>
      </div>

      <div className='bg-blue-100 dark:bg-black'>
        <header className='my-container flex justify-between py-2'>
          <div className='logo py-2 px-5 text-3xl font-bold cursor-pointer hover:bg-blue-400 rounded-md text-white bg-blue-500'>
            C
          </div>
          <nav className='nav flex items-center gap-5'>
            <NavLink
              to='/'
              className='navlink py-2 px-5 rounded-lg text-[#394E6A] '
            >
              Home
            </NavLink>
            <NavLink
              to='/about'
              className=' py-2 px-5 rounded-lg text-[#394E6A] '
            >
              About
            </NavLink>
            <NavLink
              to='/products'
              className=' py-2 px-5 rounded-lg text-[#394E6A] '
            >
              Products
            </NavLink>
            <NavLink
              to='/cart'
              className=' py-2 px-5 rounded-lg text-[#394E6A] '
            >
              Cart
            </NavLink>
          </nav>
          <div className='mode flex gap-5 items-center'>
            <img
              src={Moon}
              alt='moon rasmi'
              className='cursor-pointer
            '
            />
            <Link
              to='/cart'
              className='cursor-pointer
            '
            >
              <img src={Cart} alt='cart rasmi' width={30} />
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
}
