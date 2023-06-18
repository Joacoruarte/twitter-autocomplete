import React from 'react';
import user from '../assets/jobs_steve_2.jpg';

export default function Twitt({ twitt, twitts, index }) {
  return (
    <div
      className={`flex gap-4 w-full pt-3 pb-4 ${
        index !== twitts.length - 1 && 'border-b border-b-slate-500'
      }`}
    >
      <img
        src={user}
        alt='Foto de usuario'
        className='w-16 h-16 rounded-full'
      />
      <div className='flex flex-col gap-2'>
        <p className='text-gray-400 text-[15px]'>@SteveJobs</p>
        <div className='w-full max-w-[30rem]'>
          <p dangerouslySetInnerHTML={{ __html: twitt }} />
        </div>
      </div>
    </div>
  );
}
