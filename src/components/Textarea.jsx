import React, { useEffect, useRef, useState } from 'react';
import user from '../assets/jobs_steve_2.jpg';
import { useSearchBox } from 'react-instantsearch-hooks';
import Autocomplete from './Autocomplete';
import { getLastWord } from '../utils/getLastWord';
import { formatMentions } from '../utils/formatMentions';

export default function Textarea({ setTwitts, twitts }) {
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [caretPosition, setCaretPosition] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const divRef = useRef();
  const { refine } = useSearchBox();

  const handleDivChange = () => {
    // Obtenemos el valor del div con el atributo contentEditable y lo guardamos en una variable
    const value = divRef.current.innerHTML;

    // Obtenemos el rango de la selección actual y lo guardamos en una variable
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    if (selection.rangeCount > 0) {
      const caretRect = range.getBoundingClientRect();
      setCaretPosition({ top: caretRect.top, height: caretRect.height });
    }

    const shouldOpenAutocomplete = /^@\w+$/.test(getLastWord(value));
    // console.log(shouldOpenAutocomplete);

    setShowAutoComplete(shouldOpenAutocomplete);
    shouldOpenAutocomplete && refine(getLastWord(value).slice(1));
  };

  const handleSelection = (userHandle) => {
    const value = formatMentions({ value: divRef.current.innerHTML , userHandle });
    divRef.current.innerHTML = value;
    setShowAutoComplete(false);
  };

  useEffect(() => {
    if (caretPosition) {
      const containerHeight = divRef.current.scrollHeight;
      const dropdownTop = caretPosition.top + caretPosition.height + 120;
      const dropdownLeft = 0;
      setDropdownPosition({
        top: dropdownTop - containerHeight,
        left: dropdownLeft,
      });
    }
  }, [caretPosition]);

  const handleSubmit = () => {
    const value = divRef.current.innerHTML;
    if(value === '') return;
    setTwitts([...twitts, value]);
    divRef.current.innerHTML = '';
  };

  return (
    <div className='box'>
      <div className='flex gap-2'>
        <img
          src={user}
          alt='Foto de usuario'
          className='w-16 h-16 rounded-full'
        />

        <div className='relative'>
          <form>
            <div
              ref={divRef}
              onInput={handleDivChange}
              contentEditable='true'
              className='box-editable'
              placeholder='¿Qué está pasando?'
            />
          </form>
          {showAutoComplete && (
            <Autocomplete
              handleSelection={handleSelection}
              top={`${dropdownPosition.top}px`}
            />
          )}
        </div>
      </div>
      <div className='box-button'>
        <button className='button-twitt' onClick={handleSubmit}>
          Twittear
        </button>
      </div>
    </div>
  );
}
