import { useRef } from "react";

export default function Start({ setUsername }) {
  const inputRef = useRef();

  const handleClick = () => {
    if (inputRef.current.value) {
      setUsername(inputRef.current.value);
    }
  };

  return (
    <div className="start">
        <h1 className="startTitle">Kaun Banega Crorepati</h1>
        <input
          placeholder="Yahan Apna Naam Likhein"
          className="startInput"
          ref={inputRef}
        />
        <button className="startButton" onClick={handleClick}>
          Khel Shuru Karein
        </button>
      </div>
  );
}
