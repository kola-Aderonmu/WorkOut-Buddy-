import { useState } from "react";
import { backendUrl } from "../utils/helpers";

const UpdatingForm = ({ id }) => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [timeToStart, setTimeToStart] = useState("");
  const [error, setError] = useState(null);
  const [showUpdatingModal, setShowUpdatingModal] = useState(false);

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `${backendUrl}/api/workouts/${workout._id}`,
        id,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDate(response.data.date);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-center w-[80%] mx-autoshadow-xl">
      <form className="create mr-3">
        <h3 className="font-semibold p-3 shadow-md mb-3">Update Workout</h3>
        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => {
            if (error) {
              setError(null);
            }
            setTitle(e.target.value);
          }}
          value={title}
        />
        <label>Load (In kg):</label>
        <input
          type="number"
          onChange={(e) => {
            if (error) {
              setError(null);
            }
            setLoad(e.target.value);
          }}
          value={load}
        />
        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => {
            if (error) {
              setError(null);
            }
            setReps(e.target.value);
          }}
          value={reps}
        />
        <label>Time to Start:</label>
        <input
          type="datetime-local"
          required="choose date and time"
          onChange={(e) => {
            if (error) {
              setError(null);
            }
            setTimeToStart(e.target.value);
          }}
          value={timeToStart}
        />
        <button onClick={handleUpdate}>Update</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default UpdatingForm;
