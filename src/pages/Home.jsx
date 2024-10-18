import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import http from '../axios';

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    http
      .get(
        'https://strapi-store-server.onrender.com/api/products?featured=true'
      )
      .then((data) => {
        console.log(data.data.data);
        setProducts(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  function handleDet(id) {
    navigate(`/products/${id}`);
  }
  return (
    <div className='my-container'>
      <div className='slider mt-20 flex justify-between'>
        <div className='text w-[570px]'>
          <h1 className='text-[#394E6A] text-6xl font-bold pt-4'>
            We are changin the <br /> way people shop
          </h1>
          <p className='text-[#394E6A] leading-8 mt-8 mb-10'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            mollitia quo sit voluptates debitis ratione, rerum eius quidem, quis
            ea dolorum neque illum.
          </p>
          <Link
            to='/products'
            className='bg-blue-500 py-3 px-5 text-white rounded-md hover:bg-blue-400'
          >
            OUR PRODUCTS
          </Link>
        </div>
        <div className='carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4'>
          <div className='carousel-item'>
            <img
              src='https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp'
              className='rounded-box w-[320px] h-[416px]'
            />
          </div>
          <div className='carousel-item'>
            <img
              src='https://react-vite-comfy-store-v2.netlify.app/assets/hero2-2271e3ad.webp'
              className='rounded-box w-[320px] h-[416px]'
            />
          </div>
          <div className='carousel-item'>
            <img
              src='https://react-vite-comfy-store-v2.netlify.app/assets/hero3-a83f0357.webp'
              className='rounded-box w-[320px] h-[416px]'
            />
          </div>
          <div className='carousel-item'>
            <img
              src='https://react-vite-comfy-store-v2.netlify.app/assets/hero4-4b9de90e.webp'
              className='rounded-box w-[320px] h-[416px]'
            />
          </div>
        </div>
      </div>

      <div className='wrapper pb-20'>
        <h3 className='text-3xl text-[#394E6A] pb-5'>Featured Products</h3>
        <hr />
        <div className='prouducts flex justify-between pt-12'>
          {products.length > 0 &&
            products.map((prod) => {
              return (
                <div
                  className='w-[320px] rounded-lg bg-white cursor-pointer shadow-xl p-4 flex flex-col justify-center items-center'
                  onClick={() => handleDet(prod.id)}
                >
                  <img
                    src={prod.attributes.image}
                    alt=''
                    className='w-full h-[190px] rounded-lg'
                  />
                  <div className='text p-6 flex flex-col items-center gap-2'>
                    <h3 className='text-[#394E6A]'>{prod.attributes.title}</h3>
                    <p className='text-[#394E6A]'>{prod.attributes.price}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
