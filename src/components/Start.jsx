import { useEffect, useRef } from "react";
import useSound from 'use-sound';
import wait from '../assets/wait.wav';

function Start({ setUsername, setView, isGameStarted }) {
  const inputRef = useRef();
  const [playWait, { stop }] = useSound(wait, { loop: true });

  useEffect(() => {
    if (!isGameStarted) {
      playWait();
    }
    return () => stop();
  }, [playWait, stop, isGameStarted]);

  const handleClick = () => {
    if (inputRef.current.value) {
      stop();
      setUsername(inputRef.current.value);
      setView('game');
    } else {
      alert("Please enter your name to start!");
    }
  };

  return (
    <div className="start-container">
      <div className="start">
        <h1 className="startTitle">आपका हार्दिक स्वागत हैं।</h1>
        <input
          placeholder="Write your good name."
          className="startInput"
          ref={inputRef}
        />
        <button className="startButton" onClick={handleClick}>
          START
        </button>
      </div>
      <footer className="landing-footer">
        Made with ❤️ by <a href="https://www.linkedin.com/in/yoursyuvii/" target="_blank" rel="noopener noreferrer">yoursyuvii</a>
      </footer>
    </div>
  );
}

export default Start;