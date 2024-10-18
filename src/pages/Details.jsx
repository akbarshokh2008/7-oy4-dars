import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import http from '../axios';

export default function Details() {
  const [product, setProduct] = useState({});
  const [color, setColors] = useState('');
  const params = useParams();
  const { id } = params;
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
  }, []);

  return (
    <div className='my-container text-[#394E6A] py-20 '>
      <p className='pages mb-6'>
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
          <div className='text w-[512px]'>
            <h3>{product.attributes.title}</h3>
            <p>{product.attributes.company}</p>
            <p>{product.attributes.description}</p>
            <div className='color'>
              <p>Colors</p>

              <div className='flex gap-2'>
                {product.attributes.colors.length > 0 &&
                  product.attributes.colors.map((rang) => {
                    return (
                      <span
                        style={{
                          backgroundColor: rang,
                          border: color == rang ? '2px solid black' : 'none',
                        }}
                        className='block w-4 h-4 rounded-full cursor-pointer'
                        onClick={() => {
                          setColors(rang);
                        }}
                      ></span>
                    );
                  })}
              </div>

              <div>
                <select className='w-[300px]'>
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
          </div>
        </div>
      )}
    </div>
  );
}
