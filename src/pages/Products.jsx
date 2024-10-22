import React, { useEffect, useRef, useState } from 'react';
import http from '../axios';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [company, setCompany] = useState([]);
  const [price, setPrice] = useState(100000);

  const searchRef = useRef('');
  const categoryRef = useRef('');
  const companyRef = useRef('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const search = searchRef.current;
    const category = categoryRef.current;
    const company = companyRef.current;

    http
      .get(
        `products?search=${search}&category=${category}&company=${company}&order=a-z&price=${price}`
      )
      .then(
        (data) => (
          console.log(data.data.data),
          setProducts(data.data.data),
          setTotal(data.data.meta.pagination.total),
          setCategory(data.data.meta.categories),
          setCompany(data.data.meta.companies)
        )
      )
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();
  function handleDetails(id) {
    navigate(`/products/${id}`);
  }

  function handleFilter(e) {
    e.preventDefault();
    fetchProducts();
  }

  return (
    <div className='my-container text-[#394E6A] pt-20'>
      <form
        className='filter-qism grid grid-cols-4 bg-blue-100 dark:bg-[#181920] dark:text-white py-4 px-8 rounded-lg '
        onSubmit={handleFilter}
      >
        <div className='search w-[260px] flex flex-col gap-14'>
          <div>
            <label htmlFor='search'>Search Product</label>
            <input
              type='text'
              id='search'
              className='bg-white dark:bg-[#272935]  border border-gray-300  py-1 px-4 w-full rounded-xl mt-2'
              onChange={(e) => (searchRef.current = e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='price flex justify-between pl-2'>
              <p>Select Price</p>
              <span>$1.000.00</span>
            </div>
            <input
              type='range'
              min={0}
              max='100000'
              className='range range-info dark:range-secondary'
            />
            <div className='maxprice flex justify-between pl-2'>
              <p>0</p>
              <p className='font-bold'>Max : $1,000.00</p>
            </div>
          </div>
        </div>
        <div className='category w-[260px] flex flex-col gap-14'>
          <div className='flex flex-col'>
            <label htmlFor='category'>Select Category</label>
            <select
              id='category'
              className='bg-white dark:bg-[#272935]  border border-gray-300  py-1 px-4 w-full rounded-xl mt-2'
              onChange={(e) => (categoryRef.current = e.target.value)}
            >
              {category.length > 0 &&
                category.map((item, index) => {
                  return (
                    <option value={item} className='' key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className='text-center '>
            <p className='pb-2'>Free Shipping</p>
            <input
              type='checkbox'
              name='shipping'
              className='checkbox checkbox-primary checkbox-sm'
            />
          </div>
        </div>
        <div className='company w-[260px] flex flex-col gap-14'>
          <div>
            <label htmlFor='company'>Search Company</label>
            <select
              id='company'
              className='bg-white dark:bg-[#272935]  border border-gray-300  py-1 px-4 w-full rounded-xl mt-2'
              onChange={(e) => (companyRef.current = e.target.value)}
            >
              {company.length > 0 &&
                company.map((item) => {
                  return (
                    <option value={item} className=''>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>
          <button className='bg-blue-600 dark:bg-[#FF7AC6] dark:hover:bg-[#9e3d8e] text-white  rounded-lg hover:bg-blue-700 w-full text-center py-1  dark:text-[#301C27]'>
            SEARCH
          </button>
        </div>
        <div className='sort w-[260px] flex flex-col gap-14'>
          <div>
            <label htmlFor='sort'>Search Product</label>
            <select
              id='category'
              className='bg-white dark:bg-[#272935]  border border-gray-300  py-1 px-4 w-full rounded-xl mt-2'
            >
              <option value=''>a-z</option>
              <option value=''>z-a</option>
              <option value=''>high</option>
              <option value=''>low</option>
            </select>
          </div>
          <button className='bg-[#FF7AC6] text-white dark:bg-[#FFB86B] dark:hover:bg-[#f3a552]  rounded-lg hover:bg-[#9e3d8e] w-full text-center py-1 dark:text-[#301C27]'>
            RESET
          </button>
        </div>
        {/* <button type='submit'>Search</button> */}
      </form>
      <div className='prodleng'>
        <h3 className='text-xl pb-5 mt-16'>{total} products</h3>
        <hr />
      </div>

      <div className='wrapper pt-12 flex flex-wrap justify-around gap-5 mt-12 '>
        {products.length > 0 &&
          products.map((item) => {
            return (
              <div
                className='w-[350px] shadow-xl rounded-lg flex justify-center items-center cursor-pointer flex-col'
                key={item.id}
                onClick={() => handleDetails(item.id)}
              >
                <img
                  src={item.attributes.image}
                  alt=''
                  className='w-[320px] h-[192px] rounded-lg'
                />
                <div className='text p-6 text-center'>
                  <h2 className='text-xl font-bold'>
                    {item.attributes.title
                      .split(' ')
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(' ')}
                  </h2>{' '}
                  <p className='text-xl mt-3 '>
                    ${(item.attributes.price / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
