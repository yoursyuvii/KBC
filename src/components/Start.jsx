import { useRef } from "react";
import useSound from "use-sound";
import play from "../assets/play.wav";

export default function Start({ setUsername }) {
  const inputRef = useRef();
  const [playGame] = useSound(play);

  const handleClick = () => {
    if (inputRef.current.value) {
      playGame();
      setUsername(inputRef.current.value);
    }
  };

  return (
    <div className="start">
        <h1 className="startTitle">KBC By YUVRAJ</h1>
        <input
          placeholder="Write your good name."
          className="startInput"
          ref={inputRef}
        />
        <button className="startButton" onClick={handleClick}>
          START
        </button>
      </div>
  );
}
