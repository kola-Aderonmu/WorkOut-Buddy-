import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { WorkOutUpdateContext } from "../context/WorkoutUpdateContex";
import { useNavigate } from "react-router";
import { backendUrl } from "../utils/helpers";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const { selectedWorkOut, setSelectedWorkOut } =
    useContext(WorkOutUpdateContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [timeToStart, setTimeToStart] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Close the modal after 4 seconds
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showModal]);

  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault(); //to aviod page from refreshing

    const workout = { title, load, reps, timeToStart };

    if (!timeToStart) {
      return;
    }

    if (!user) {
      setError("You must be logged in");
      return;
    }
    try {
      const result = await axios.post(`${backendUrl}/api/workouts`, workout, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // console.log(result);
      dispatch({ type: "CREATE_WORKOUT", payload: result.data });
      setTitle("");
      setLoad("");
      setReps("");
      setTimeToStart("");
      setShowModal(true);
    } catch (error) {
      console.log(error);

      setError(error.response.data.message);
    }
  };

  const handleUpdateWorkOut = async (e) => {
    e.preventDefault();
    console.log(selectedWorkOut);

    try {
      const response = await axios.patch(
        `${backendUrl}/api/workouts/${selectedWorkOut._id}`,
        {
          ...selectedWorkOut,
          _id: undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);

      navigate(0);
      setSelectedWorkOut(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateWorkOutValue = (e) => {
    const { name, value } = e.target;

    setSelectedWorkOut((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <form className="create mr-3">
      <h3 className="font-semibold p-3 shadow-md mb-3">Add a New Workout</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        name="title"
        onChange={
          selectedWorkOut
            ? (e) => handleUpdateWorkOutValue(e)
            : (e) => {
                if (error) {
                  setError(null);
                }
                setTitle(e.target.value);
              }
        }
        value={selectedWorkOut?.title || title}
      />
      <label>Load (In kg):</label>
      <input
        type="number"
        name="load"
        onChange={
          selectedWorkOut
            ? (e) => handleUpdateWorkOutValue(e)
            : (e) => {
                if (error) {
                  setError(null);
                }
                setLoad(e.target.value);
              }
        }
        value={selectedWorkOut?.load || load}
      />
      <label>Reps:</label>
      <input
        type="number"
        name="reps"
        onChange={
          selectedWorkOut
            ? (e) => handleUpdateWorkOutValue(e)
            : (e) => {
                if (error) {
                  setError(null);
                }
                setReps(e.target.value);
              }
        }
        value={selectedWorkOut?.reps || reps}
      />
      <label>Time to Start:</label>
      <input
        type="datetime-local"
        required="choose date and time"
        name="timeToStart"
        onChange={
          selectedWorkOut
            ? (e) => handleUpdateWorkOutValue(e)
            : (e) => {
                if (error) {
                  setError(null);
                }
                setTimeToStart(e.target.value);
              }
        }
        value={
          (selectedWorkOut &&
            new Date(selectedWorkOut?.timeToStart)
              .toISOString()
              .slice(0, 16)
              .replace("T", " ")) ||
          timeToStart
        }
      />
      {selectedWorkOut ? (
        <button onClick={handleUpdateWorkOut}>Update workout</button>
      ) : (
        <button onClick={handleSubmit}>Add Workout</button>
      )}
      {error && <div className="error">{error}</div>}

      {showModal && (
        <div className="modal">
          <p>Workout added!</p>
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
