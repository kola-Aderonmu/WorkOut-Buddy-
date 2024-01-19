import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import images from "../assets/images";
import Footer from "../components/Footer";

const AuthLayout = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="pages h-screen md:flex-row flex flex-col rounded-2xl">
        <div className="landing-pic bg-green-100 md:w-1/2">
          <div className="carousel">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                style={{ display: index === currentIndex ? "block" : "none" }}
              />
            ))}
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;
