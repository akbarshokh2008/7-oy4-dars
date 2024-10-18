import React from 'react';

export default function About() {
  return (
    <div className='flex justify-center items-center pt-20 flex-col'>
      <div className='sarlav flex gap-6'>
        <h1 className='text-[#394E6A] text-6xl font-bold'>We love </h1>
        <span className='px-6 py-4 bg-blue-500 text-3xl rounded-2xl text-white'>
          comfy
        </span>
      </div>
      <div className='text w-[620px] mt-6'>
        <p className='text-[#394E6A]'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae
          quam blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia
          optio aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo
          sed officiis ea tempore! Similique eos minima sit porro, ratione
          aspernatur!
        </p>
      </div>
    </div>
  );
}
