import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../App';
import { useNavigate } from 'react-router-dom';
import http from '../axios';

export default function Cart() {
  const [cart, setCart] = useContext(CartContext);
  const [token, setToken] = useState(localStorage.getItem('token'));
  console.log(cart);
  const nameRef = useRef();
  const addressRef = useRef();
  const formRef = useRef();
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let sum = 0;
    cart.forEach((c) => {
      sum += Number(c.amount);
    });
    setCount(sum);
  }, [cart]);

  console.log(cart);

  const subTotal = () => {
    return cart.reduce((total, cart) => {
      return total + cart.data.attributes.price * cart.amount;
    }, 0);
  };
  function handleSubmit(e) {
    e.preventDefault();
    const cartItems = cart.map((item) => ({
      amount: item.amount,
      cartID: '12#FF5733',
      company: item.data.attributes.company,
      image: item.data.attributes.image,
      productColor: item.color,
      productID: item.id,
      price: (item.data.attributes.price / 100).toFixed(2),
      data: item.data.attributes,
      title: item.data.attributes.title,
    }));

    const data = {
      data: {
        address: addressRef.current.value,
        cartItems: cartItems,
        chargeTotal: '37898',
        name: nameRef.current.value,
        numItemsInCart: '1',
        orderTotal: '378',
      },
    };
    console.log(data);
    http
      .post('orders', data, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log('Success:', data);
        formRef.current.reset();
        setCart([]);
        localStorage.removeItem('cart');
        navigate('/orders');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='cart text-[#394E6A] dark:text-white my-container'>
      <h2 className='text-3xl font-bold pb-6 pt-20 border-b border-gray-600 dark:border-black dark:text-white'>
        Shopping Cart
      </h2>

      {cart.length > 0 && (
        <div className='wrapper flex justify-between mt-8'>
          <div className='shipping w-[530px] flex flex-col gap-4'>
            <h2 className='font-bold  text-xl'>Shipping Information</h2>
            <form
              className='flex flex-col gap-4'
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className='flex flex-col gap-2'>
                <label htmlFor='name'>First Name</label>
                <input
                  ref={nameRef}
                  type='text'
                  id='name'
                  className='py-2 rounded-lg bg-inherit w-full border border-gray-500'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='addres'>Address</label>
                <input
                  ref={addressRef}
                  type='text'
                  id='addres'
                  className='py-2 rounded-lg bg-inherit w-full border border-gray-500'
                  required
                />
              </div>
              <button
                className='w-full py-3 rounded-lg dark:bg-pink-400 dark:text-[#301C27] bg-blue-500 text-white  '
                type='submit'
              >
                PLACE YOUR ORDER
              </button>
            </form>
          </div>
          <div className='hisobot'>
            <div className=' w-[555px] bg-slate-200 dark:bg-[#181920] dark:text-white rounded-2xl h-[255px] p-6'>
              <div className='flex justify-between mb-4 border-b pb-3 border-gray-600'>
                <p className='text-lg'>Subtotal</p>
                <p className='text-xl font-bold'>
                  ${(subTotal() / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
