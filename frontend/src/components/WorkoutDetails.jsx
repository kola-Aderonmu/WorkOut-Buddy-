import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

import CountdownTimer1 from "./CountdownTimer ";
import UpdatingForm from "./UpdatingForm";
import { WorkOutUpdateContext } from "../context/WorkoutUpdateContex";
import { backendUrl } from "../utils/helpers";

const WorkoutDetails = ({ workout }) => {
  // const handleTimeout = () => {
  //   alert("Countdown reached zero!");
  //   showModal(false);
  // };

  const { setSelectedWorkOut } = useContext(WorkOutUpdateContext);

  const [date, setDate] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showStartNow, setShowStartNow] = React.useState(false);

  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.delete(
        `${backendUrl}/api/workouts/${workout._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = response.data;
      // console.log(json);

      if (response.status === 200) {
        dispatch({ type: "DELETE_WORKOUT", payload: json });
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  //************************************************************* */

  const handleEdit = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/workouts/${workout._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response.data);
      setSelectedWorkOut(response.data);
      setDate(response.data);
      setEditMode(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let timeout;
    if (showModal) {
      timeout = setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showModal]);

  return (
    <>
      <div className="workout-details">
        {showModal && <div className="modal">Workout removed</div>}
        <h4 className="capitalize">{workout.title}</h4>
        <p>
          <strong>Load (Kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p className="font-mono">
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <div className="flex justify-end gap-6">
          {showStartNow && (
            <div className="flex gap-4">
              {/* <div>
                <span class="material-symbols-outlined">forum</span>
              </div> */}

              <button className="hover:bg-sky-200 shadow-md p-2 rounded-lg ">
                <a
                  href={`https://www.youtube.com/results?search_query=${workout?.title
                    ?.split(" ")
                    .join("+")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono "
                >
                  Start now
                </a>
              </button>
              {/* <span class="material-symbols-outlined">reviews</span> */}
            </div>
          )}

          <CountdownTimer1
            initialTime={workout.timeToStart}
            setShowStartNow={setShowStartNow}
            showStartNow={showStartNow}
          />
        </div>
        <span className="space-x-4">
          <div
            className="material-symbols-outlined cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </div>
          <div
            className="material-symbols-outlined cursor-pointer"
            onClick={handleClick}
          >
            Delete
          </div>
        </span>
      </div>
    </>
  );
};

export default WorkoutDetails;
