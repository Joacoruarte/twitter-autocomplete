import { useState } from 'react';
import Textarea from './components/Textarea';
import Twitts from './components/Twitts';

export default function App() {
  const [twitts, setTwitts] = useState([]);

  return (
    <div className='w-full flex flex-col items-center gap-4 justify-center mt-[4rem]'>
      <Textarea setTwitts={setTwitts} twitts={twitts} />

      <Twitts twitts={twitts} />
    </div>
  );
}
