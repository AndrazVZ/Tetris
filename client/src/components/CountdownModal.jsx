import React, { useState, useEffect } from "react";
import "./Modal.css";

const CountdownModal = ({ onClose }) => {
  const [time, setTime] = useState(3);

  useEffect(() => {
    let counter = 3;
    setTime(counter);

    const interval = setInterval(() => {
      counter -= 1;
      setTime(counter);

      if (counter <= 0) {
        clearInterval(interval);
        onClose(); 
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="overlay"></div>
      <div className="modal clear">
        <h2>{time > 0 ? time : null}</h2>
      </div>
    </>
  );
};

export default CountdownModal;
