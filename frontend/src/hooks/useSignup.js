// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuthContext } from "./useAuthContext";

// export const useSignup = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const { dispatch } = useAuthContext();

//   const signup = async (email, password) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post("/api/user/signup", {
//         email,
//         password,
//       });

//       const json = response.data;

//       if (!response.ok) {
//         setIsLoading(false);
//         setError(json.error);
//       }

//       if (response.ok) {
//         // save the user to local storage
//         localStorage.setItem("user", JSON.stringify(json));

//         // update the auth context
//         dispatch({ type: "LOGIN", payload: json });

//         // show success modal
//         setShowSuccessModal(true);

//         // update loading state
//         setIsLoading(false);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       setError("An error occurred during signup.");
//       console.error("Error during signup:", error);
//     }
//   };

//   useEffect(() => {
//     let successModalTimeout;
//     if (showSuccessModal) {
//       successModalTimeout = setTimeout(() => {
//         setShowSuccessModal(false);
//       }, 3000);
//     }
//     return () => {
//       clearTimeout(successModalTimeout);
//     };
//   }, [showSuccessModal]);

//   return { signup, isLoading, error, showSuccessModal };
// };

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log(response);
      if (!response.ok) {
        setIsLoading(false);
        setError(json);
      }

      if (response.ok) {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // update the auth context
        dispatch({ type: "LOGIN", payload: json });

        // update loading state
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return { signup, isLoading, error };
};
