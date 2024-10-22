import React, { useContext, useState } from 'react';
import { CartContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();
  console.log(cart);

  const subTotal = () => {
    return cart.reduce((total, cart) => {
      return total + cart.data.attributes.price * cart.amount;
    }, 0);
  };

  return (
    <div className='cart text-[#394E6A] my-container'>
      <h2 className='text-3xl font-bold pb-6 pt-20 border-b border-gray-600 dark:border-black dark:text-white'>
        Shopping Cart
      </h2>

      <div className='wrapper flex justify-between mt-8'>
        <div className='cards'>
          {cart.length > 0 &&
            cart.map((item, index) => {
              return (
                <div
                  className='flex mb-12 pb-6 dark:text-white border-b border-gray-600 dark:border-black'
                  key={index}
                >
                  <img
                    src={item.data.attributes.image}
                    alt='rasm'
                    className='rounded-lg w-[128px] h-[128px]'
                  />
                  <div className='rangi ml-16 w-48'>
                    <h3 className='font-bold '>
                      {item.data.attributes.title
                        .split(' ')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')}
                    </h3>
                    <h3 className='mt-2 text-[#c7c9d1]'>
                      {item.data.attributes.company}
                    </h3>
                    <div className='rang flex gap-2 items-center mt-4'>
                      <p>Color: </p>
                      <span
                        style={{ backgroundColor: item.color }}
                        className='block w-5 h-5 rounded-full'
                      ></span>
                    </div>
                  </div>
                  <div className='soni flex flex-col ml-12 '>
                    <p>Amount</p>
                    <select
                      className='bg-white dark:bg-inherit border  rounded-md mt-2 text-xl'
                      value={item.amount}
                      onChange={(e) => {
                        const updatedProducts = cart.map((p) => {
                          if (p.id === item.id && p.color === item.color) {
                            return { ...p, amount: parseInt(e.target.value) };
                          }
                          return p;
                        });
                        setCart(updatedProducts);
                        localStorage.setItem(
                          'cart',
                          JSON.stringify(updatedProducts)
                        );
                      }}
                    >
                      <option selected value={item.amount}>
                        {item.amount}
                      </option>
                      {[...Array(10)].map((_, i) => (
                        <option
                          key={i}
                          value={i + 1}
                          className='dark:bg-[#272935]'
                        >
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className='cursor-pointer text-blue-600 mt-2 dark:text-[#FF7AC6]'
                      onClick={() => {
                        const updatedProducts = cart.filter(
                          (p) => !(p.id === item.id && p.color === item.color)
                        );
                        setCart(updatedProducts);
                        localStorage.setItem(
                          'cart',
                          JSON.stringify(updatedProducts)
                        );
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <div className='narx'>
                    <p className='text-xl ml-64 mt-1 font-bold'>
                      ${(item.data.attributes.price / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className='hisobot'>
          <div className=' w-[295px] bg-slate-200 dark:bg-[#181920] dark:text-white rounded-2xl h-[255px] p-6'>
            <div className='flex justify-between mb-4 border-b pb-3 border-gray-600'>
              <p className='text-lg'>Subtotal</p>
              <p className='text-xl font-bold'>
                ${(subTotal() / 100).toFixed(2)}
              </p>
            </div>
          </div>
          <div className='w-[295px]'>
            {localStorage.getItem('token') ? (
              <button
                onClick={() => {
                  navigate('/checkout');
                }}
                className='w-full py-3 rounded-lg bg-pink-400 text-[#301C27] dark:bg-blue-500 dark:text-white font-bold mt-8'
              >
                PROCEED TO CHECKOUT
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                }}
                className='w-full py-3 rounded-lg dark:bg-pink-400 dark:text-[#301C27] bg-blue-500 text-white font-bold mt-8'
              >
                PLEASE LOGIN
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
