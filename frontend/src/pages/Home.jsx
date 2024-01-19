import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { backendUrl } from "../utils/helpers";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const location = useLocation();

  useEffect(() => {
    if (new URLSearchParams(location.search).get("login")) {
      toast.success(`${new URLSearchParams(location.search).get("login")}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }

    const fetchWorkouts = async () => {
      const response = await fetch(`${backendUrl}/api/workouts`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <>
      <ToastContainer />
      <div className="home">
        {workouts?.length <= 0 ? (
          <div className="bg-white w-fit p-20 rounded-full text-center shadow-2xl">
            <p className="font-mono text-3xl mt-36 font-semibold">
              You have'nt recorded any workout yet...
            </p>
          </div>
        ) : (
          <div className="workouts ml-4">
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetails workout={workout} key={workout._id} />
              ))}
          </div>
        )}
        <WorkoutForm />
      </div>
    </>
  );
};

export default Home;
