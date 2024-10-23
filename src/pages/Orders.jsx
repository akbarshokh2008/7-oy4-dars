import React, { useEffect, useState } from 'react';
import http from '../axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  console.log(orders);
  const [token, setToken] = useState(localStorage.getItem('token'));

  console.log(orders);
  useEffect(() => {
    http
      .get('orders', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data.attributes);
        setOrders(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className='cart text-[#394E6A] dark:text-white my-container'>
      <h2 className='text-3xl font-bold pb-6 pt-20 border-b border-gray-600 dark:border-black dark:text-white'>
        Your Orders
      </h2>
      <div>
        <h3 className='mb-4 mt-8 '>Total Orders : {orders.length}</h3>
        <div>
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto'>
              <thead className='border-b-2 border-b-black'>
                <tr className='text-gray-400'>
                  <th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>
                    Name
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>
                    Address
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>
                    Products
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>
                    Cost
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className=''>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className='hover:bg-gray-700 border-b border-b-gray-600'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {order.attributes.name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {order.attributes.address}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {order.attributes.cartItems.reduce(
                        (total, item) => total + item.amount,
                        0
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      $
                      {order.attributes.cartItems
                        .reduce(
                          (total, item) => total + item.amount * item.price,
                          0
                        )
                        .toFixed(2)}{' '}
                      {/* Ikkita kasr sonli formatda chiqarish */}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {order.attributes.publishedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{' '}
        </div>
      </div>
    </div>
  );
}
