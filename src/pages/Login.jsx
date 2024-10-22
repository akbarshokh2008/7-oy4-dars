import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import http from '../axios';

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/i;

    if (regex.test(password)) {
      return true;
    } else {
      return false;
    }
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    // EMAIL
    if (!validateEmail(emailRef.current.value)) {
      setErrorEmail('Email xato');
      emailRef.current.focus();
      emailRef.current.style.outlineColor = 'red';
      return false;
    } else {
      setErrorEmail('');
      emailRef.current.style.outlineColor = 'black';
    }
    // PASSWORD
    if (!validatePassword(passwordRef.current.value)) {
      setErrorPassword('Password kamida 6 ta harf va raqamdan bulish kerak');
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = 'red';
      return false;
    } else {
      setErrorPassword('');
      passwordRef.current.style.outlineColor = 'black';
    }

    return true;
  }

  function handleRegister(e) {
    e.preventDefault();

    const valid = validate();
    if (!valid) {
      return;
    }

    const user = {
      identifier: emailRef.current.value,
      password: passwordRef.current.value,
    };

    http
      .post('auth/local', user)
      .then((response) => {
        if (response.data.jwt) {
          formRef.current.reset();
          localStorage.setItem('token', response.data.jwt);
          localStorage.setItem('users', JSON.stringify(response.data.user));
          navigate('/');
        }
      })
      .catch((error) => {
        alert(error.response.data.error.message);
      });
  }

  return (
    <div>
      <div className='flex justify-center items-center mt-[10%] text-[#394E6A]'>
        <form
          className='flex flex-col w-96 p-5 rounded-xl shadow-xl gap-6'
          ref={formRef}
        >
          <h2 className='text-3xl font-bold text-center'>Login</h2>
          <div className='email '>
            <label htmlFor='email' className=''>
              Email
            </label>
            {errorEmail && (
              <p className='text-red-700 mb-[-5px]'>{errorEmail}</p>
            )}
            <input
              ref={emailRef}
              type='email'
              className='input input-bordered w-full bg-white mt-2 border-2'
              id='email'
            />{' '}
          </div>
          <div className='Password '>
            <label htmlFor='password' className=''>
              Password
            </label>
            {errorPassword && (
              <p className='text-red-700 mb-[-5px]'>{errorPassword}</p>
            )}
            <input
              ref={passwordRef}
              type='password'
              className='input input-bordered w-full  bg-white mt-3 border-2'
              id='password'
            />
          </div>
          <div className='flex flex-col gap-3 mt-4'>
            <button
              onClick={handleRegister}
              className='bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600'
            >
              LOGIN
            </button>

            <button
              onClick={handleRegister}
              className='bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-950 mt-[5px]'
            >
              GUEST USER
            </button>
            <p className='text-center '>
              Not a member yet?{' '}
              <Link className='text-blue-500' to='/register'>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
