import { useState, useEffect } from "react";
import "./cursor.scss";

const Cursor = () => {
  // Cursor ki current position (x, y) ko store karne ke liye state
  const [position, setPosition] = useState({ x: -100, y: -100 });
  // Cursor ke peeche aane wale trail particles ko store karne ke liye state
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    // Jab bhi mouse move hoga, yeh function call hoga
    const handleMouseMove = (e) => {
      // Cursor ki position update karein
      setPosition({ x: e.clientX, y: e.clientY });

      // Trail ke liye ek naya particle (currency symbol) banayein
      const newParticle = {
        id: Date.now() + Math.random(), // Har particle ke liye ek unique ID
        x: e.clientX,
        y: e.clientY,
      };

      // Naye particle ko trail array mein add karein
      // Hum purane particles ko bhi rakhenge, isliye 'prevTrail' ka istemal kiya hai
      setTrail((prevTrail) => [...prevTrail, newParticle]);

      // Particle ko animation duration ke baad DOM se remove kar dein
      // Yeh memory ko manage karne ke liye zaroori hai
      setTimeout(() => {
        setTrail((prevTrail) =>
          prevTrail.filter((particle) => particle.id !== newParticle.id)
        );
      }, 1000); // Yeh time CSS animation ki duration se match hona chahiye
    };

    // 'mousemove' event listener ko window par add karein
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function: Jab component unmount ho, toh event listener ko hata dein
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Sabhi trail particles ko render karein */}
      {trail.map((particle) => (
        <div
          key={particle.id}
          className="trail"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            // Har particle ko ek random rotation dein, taaki woh natural lage
            transform: `translate(-50%, -50%) rotate(${Math.random() * 20 - 10}deg)`
          }}
        >
          ₹
        </div>
      ))}
      {/* Main custom cursor ko render karein */}
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        ₹
      </div>
    </>
  );
};

export default Cursor;
