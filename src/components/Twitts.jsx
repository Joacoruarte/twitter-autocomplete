import React from 'react';
import Twitt from './Twitt';

export default function Twitts({ twitts }) {
  return (
    <>
      <h3 className='min-w-[36.2rem] text-zinc-800 font-bold'>Twitts:</h3>
      {twitts.length === 0 ? (
        <p className='text-xl text-zinc-800 font-bold'>No hay twitts</p>
      ) : (
        <div className='box min-w-[36.5rem] flex flex-col min-h-[4rem]'>
          {twitts.map((twitt, index) => (
            <Twitt twitt={twitt} index={index} key={index} twitts={twitts} />
          ))}
        </div>
      )}
    </>
  );
}
