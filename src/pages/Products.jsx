import React, { useEffect, useRef, useState } from 'react';
import http from '../axios';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [company, setCompany] = useState([]);
  const [price, setPrice] = useState(100000);
  const [page, setPage] = useState(1);
  const [pageSoni, setPageCount] = useState(null);
  const changRef = useRef();

  const Pagination = ({ pageSoni, page, onPageChange }) => {
    return (
      <div className='flex justify-end items-center  py-4 '>
        <div className='inline-block dark:bg-[#181920] bg-[#F0F6FF] py-2 rounded-md'>
          <button
            className={`px-3 py-1 rounded-md ${
              page === 1 ? 'text-gray-500' : 'text-white'
            }`}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            PREV
          </button>
          {[...Array(pageSoni).keys()].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                className={`px-3 py-1 rounded-md ${
                  page === pageNumber
                    ? 'dark:bg-black bg-[#d4dff5] dark:text-white text-[#394E82]'
                    : 'text-[#394E82] dark:text-white'
                }`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            className={`px-3 py-1 rounded-md ${
              page === pageSoni
                ? 'text-[#394E82] dark:text-gray-500'
                : 'dark:text-white  text-[#394E82]'
            }`}
            onClick={() => onPageChange(page + 1)}
            disabled={page === pageSoni}
          >
            NEXT
          </button>
        </div>
      </div>
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pageSoni) {
      setPage(newPage);
    }
  };

  const searchRef = useRef('');
  const categoryRef = useRef('');
  const companyRef = useRef('');

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = () => {
    const search = searchRef.current;
    const category = categoryRef.current;
    const company = companyRef.current;
    const shipping = changRef.current.checked ? '&shipping=on' : '';

    http
      .get(
        `products?page=${page}&search=${search}&category=${category}&company=${company}&order=a-z&price=${price}${shipping}`
      )
      .then(
        (data) => (
          console.log(data.data.meta),
          setProducts(data.data.data),
          setTotal(data.data.meta.pagination.total),
          setPageCount(data.data.meta.pagination.pageCount),
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

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
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
              <span>${(price / 100).toFixed(2)}</span>
            </div>
            <input
              type='range'
              min={0}
              max='100000'
              step={1000}
              value={price}
              onChange={handlePriceChange} // Qo'shilgan handlePriceChange
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
              ref={changRef}
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
      </form>

      <div className='prodleng  flex mt-16 justify-between border-b-2 border-black'>
        <h3 className='text-xl pb-5 dark:text-white'>{total} products</h3>
        <div className='but flex gap-3'>
          <button
            type='button'
            class='text-xl btn btn-circle btn-sm btn-primary text-primary-content'
          >
            <svg
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 16 16'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z'></path>
            </svg>
          </button>
          <button
            type='button'
            class='text-xl btn btn-circle btn-sm btn-ghost text-based-content'
          >
            <svg
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 16 16'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className='wrapper pt-12 flex flex-wrap justify-around gap-5 mt-12 '>
        {products.length > 0 &&
          products.map((item) => {
            return (
              <div
                className='w-[350px]  shadow-xl rounded-lg flex justify-center items-center cursor-pointer flex-col'
                key={item.id}
                onClick={() => handleDetails(item.id)}
              >
                <img
                  src={item.attributes.image}
                  alt=''
                  className='w-[320px] h-[192px] rounded-lg'
                />
                <div className='text p-6 text-center'>
                  <h2 className='text-xl font-bold dark:text-white'>
                    {item.attributes.title
                      .split(' ')
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(' ')}
                  </h2>{' '}
                  <p className='text-xl mt-3 dark:text-[#BF95F9]'>
                    ${(item.attributes.price / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <Pagination
        pageSoni={pageSoni}
        page={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
