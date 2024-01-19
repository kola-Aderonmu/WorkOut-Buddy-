import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignup } from "../hooks/useSignup";
import { backendUrl } from "../utils/helpers";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if signup is true and then navigate after 2 seconds
    if (isSignup) {
      const timeoutId = setTimeout(() => {
        // Navigate to the /login route
        navigate("/login");
      }, 3000);

      // Cleanup the timeout on component unmount or if you navigate away manually
      return () => clearTimeout(timeoutId);
    }
  }, [isSignup]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password, username };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email addres");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Please, provide a strong password!");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/user/signup`, data);

      if (response.status === 200) {
        setIsSignup(true);
        toast.success("Signup successful", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        console.log("Signup successful");
        // Handle successful signup, e.g., redirect or show a success message
      } else {
        console.error("Signup failed");
        // Handle failed signup, e.g., display an error message to the user
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="md:w-1/2 bg-white p-4 shadow-lg">
        <h3 className="m-7 text-4xl font-meduim mb-10 font-mono">Sign Up</h3>

        <label>Username:</label>
        <input
          type="text"
          placeholder="User"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <label>Email address:</label>
        <input
          type="email"
          placeholder="abc@gmail.com"
          onChange={(e) => {
            if (error) {
              setError(null);
            }
            setEmail(e.target.value);
          }}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder=""
          onChange={(e) => {
            if (error) {
              setError(null);
            }
            setPassword(e.target.value);
          }}
          value={password}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-700 text-white p-3 rounded"
        >
          Sign up
        </button>
        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
};

export default Signup;
