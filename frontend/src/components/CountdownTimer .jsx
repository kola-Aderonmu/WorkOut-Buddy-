import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const CountdownTimer1 = ({ initialTime, setShowStartNow, showStartNow }) => {
  const [showModal, setShowModal] = useState(false);
  const naviagte = useNavigate();
  const targetTime = new Date(initialTime);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [audio] = useState(new Audio("../assets/audio/beep.mp3"));

  const closeModal = () => {
    setShowModal(false);
    audio.pause();
  };

  function calculateTimeRemaining() {
    const now = new Date();
    const difference = targetTime - now;
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(intervalId);
      // setShowModal(false);
    };
  }, []);

  const stopTIme = () => {
    if (
      timeRemaining.hours === "00" &&
      timeRemaining.minutes === "00" &&
      timeRemaining.seconds === "00"
    ) {
      setShowStartNow(true);
      return false;
    } else {
      return true;
    }
  };

  // console.log(showModal);
  return (
    <div className="">
      <p className="font-mono text-red-500 font-bold text-lg">
        {stopTIme() && (
          <>
            Time Remaining: {timeRemaining.hours}:{timeRemaining.minutes}:
            {timeRemaining.seconds}
          </>
        )}

        {showStartNow && showModal && <button>Hello</button>}
      </p>
    </div>
  );
};

export default CountdownTimer1;
