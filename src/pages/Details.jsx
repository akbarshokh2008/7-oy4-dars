import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import http from '../axios';
import { CartContext } from '../App';
// Tostify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Details() {
  const notify = () => toast('Item added to cart');

  const [product, setProduct] = useState({});
  const [color, setColors] = useState('');
  const [amount, setAmount] = useState('1');
  const params = useParams();
  const { id } = params;
  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    http
      .get(`products/${id}`)
      .then((data) => {
        setProduct(data.data.data);
        setColors(data.data.data.attributes.colors[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      data: product,
      color: color,
      amount: Number(amount),
      id: product.id,
    };

    let copied = [...cart];

    let isExiest = copied.find(function (c) {
      return c.id == data.id && color == c.color;
    });

    if (!isExiest) {
      copied = [...cart, data];
    } else {
      copied = copied.map(function (value) {
        if (value.id == data.id && value.color == color) {
          value.amount = Number(value.amount);
          value.amount += Number(data.amount);
        }
        return value;
      });
    }
    console.log(copied);
    setCart(copied);
    localStorage.setItem('cart', JSON.stringify(copied));

    notify();
  }

  function handleChange(e) {
    setAmount(e.target.value);
  }

  return (
    <div className='my-container text-[#394E6A] dark:text-white py-20 '>
      <p className='pages mb-6 '>
        <Link to='/' className='hover:underline'>
          Home
        </Link>{' '}
        {' > '}{' '}
        <Link to='/products' className='hover:underline'>
          Products
        </Link>
      </p>
      {product.id && (
        <div className='flex justify-between'>
          <img
            src={product.attributes.image}
            alt=''
            className='w-[512px] h-[385px] rounded-xl'
          />
          <div className='text w-[512px] mr-10'>
            <h1 className='text-3xl font-bold'>
              {product.attributes.title
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </h1>{' '}
            <p className='text-xl font-bold mt-2 text-[#C7C9D1]'>
              {product.attributes.company}
            </p>
            <p className='text-xl mt-3 '>
              ${(product.attributes.price / 100).toFixed(2)}
            </p>
            <p className='mt-6 leading-8'>{product.attributes.description}</p>
            <div className='color mt-6'>
              <h4 className='text-xl pb-2'>Colors</h4>

              <div className='flex gap-2 mb-4'>
                {product.attributes.colors.length > 0 &&
                  product.attributes.colors.map((rang) => {
                    return (
                      <span
                        key={rang}
                        style={{
                          backgroundColor: rang,
                          border: color === rang ? '2px solid black' : 'none',
                        }}
                        className='block w-5 h-5 rounded-full cursor-pointer'
                        onClick={() => {
                          setColors(rang);
                        }}
                      ></span>
                    );
                  })}
              </div>

              <div>
                <h3 className='text-xl pb-2'>Amount</h3>
                <select
                  className='w-[300px] bg-white  dark:bg-[#272935] border border-blue-800 py-2 px-4 rounded-md outline-blue-800'
                  value={amount}
                  onChange={handleChange}
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </select>
              </div>
            </div>
            <button
              className='py-3 px-5 bg-blue-900 text-white rounded-lg mt-8'
              onClick={handleSubmit}
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      )}
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
}
