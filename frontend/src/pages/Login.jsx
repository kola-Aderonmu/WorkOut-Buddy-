import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { backendUrl } from "../utils/helpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      const json = await response.data;

      localStorage.setItem("user", JSON.stringify(json));
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      navigate(`/?login=Succesfully login`, { replace: true });
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="bg-white p-4 shadow md:w-1/2" onSubmit={login}>
        <h3 className="text-4xl font-meduim mb-10 font-mono m-7">Log In</h3>

        <label>Email address:</label>
        <input
          type="email"
          onChange={(e) => {
            if (error) {
              setError(null);
            }
            setEmail(e.target.value);
          }}
          value={email}
          required="email is required"
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => {
            if (error) {
              setError(null);
            }
            setPassword(e.target.value);
          }}
          value={password}
          required="password is required"
        />

        <button className="bg-green-700" type="submit">
          Log In
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default Login;
