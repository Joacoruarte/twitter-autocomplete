import { useRef, useState } from "react";
import { useSearchBox } from "react-instantsearch-hooks";
import user from "./assets/jobs_steve_2.jpg";
import Autocomplete from "./Autocomplete";
import { getActiveToken } from "./utils/getActiveToken";
import getCaretCoordinates from "textarea-caret";

function filterColorForMentions(text) {
  let regx = /(^|[^\w])@([\w\_\.]+)/g;
  let arr = text.split(regx);

  return arr
    .map((e, i) => {
      if (arr[i - 1] === " ") return null;
      if (e === " " && arr[i + 1]) {
        return ` <span style="color: red;">${"@" + arr[i + 1]}</span>`;
      }
      return e;
    })
    .filter((e) => e !== null)
    .join("");
}

export default function App() {
  const inputRef = useRef();
  const [content, setContent] = useState("");
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const divContent = useRef();
  const { refine } = useSearchBox();

  const { top, height } = inputRef.current
    ? getCaretCoordinates(inputRef.current, inputRef.current.selectionEnd)
    : { top: 0, height: 0 };

  const handleKeyUp = (e) => {
    const { value, selectionEnd } = inputRef.current;
    const { word } = getActiveToken(value, selectionEnd);
    const shouldOpenAutocomplete = /^@\w{1,15}$/.test(word);
    setShowAutoComplete(shouldOpenAutocomplete);
    shouldOpenAutocomplete && refine(word.slice(1));
  };

  const handleSelection = (userHandle) => {
    const { value, selectionEnd } = inputRef.current;
    const { word, range } = getActiveToken(value, selectionEnd);
    const [index] = range;

    const prefix = value.substring(0, index);
    const suffix = value.substring(index + word.length);

    const newText = prefix + `@${userHandle}` + suffix;
    inputRef.current.value = newText;
    console.log(`${filterColorForMentions(inputRef.current.value)}`);
    setContent(filterColorForMentions(inputRef.current.value));
    divContent.current.focus();
    setShowAutoComplete(false);
  };

  const handleSubmit = () => {
    alert(inputRef.current.value);
    inputRef.current.value = "";
  };
  return (
    <div className="w-full flex justify-center mt-[10rem]">
      <div className="box">
        <div className="flex gap-2">
          <img
            src={user}
            alt="Foto de usuario"
            className="w-16 h-16 rounded-full"
          />

          <div className="relative">
            <form>
              <div
                contentEditable="true"
                className="box-editable"
                ref={divContent}
                onKeyUp={(e) => {
                  inputRef.current.value = e.target.textContent;
                  handleKeyUp();
                }}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
              <textarea
                placeholder="¿Qué está pasando?"
                className="box-editable"
                style={{
                  height: "0px",
                  width: "0px",
                  opacity: "1",
                  padding: "0px",
                  top: "440px",
                  position: "absolute",
                }}
                onKeyUp={handleKeyUp}
                ref={inputRef}
              />
            </form>
            {showAutoComplete && (
              <Autocomplete
                handleSelection={handleSelection}
                top={`${top + height}px`}
              />
            )}
          </div>
        </div>
        <div className="box-button">
          <button className="button-twitt" onClick={handleSubmit}>
            Twittear
          </button>
        </div>
      </div>
    </div>
  );
}
