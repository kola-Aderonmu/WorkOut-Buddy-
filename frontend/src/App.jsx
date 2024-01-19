import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages and components
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import AuthLayout from "./layout/AuthLayout";
import { createContext, useState } from "react";
const AppContext = createContext();


function App() {
  const { user } = useAuthContext();
  const [workoutData, setWorkoutdata] = useState(null);

  return (
    <AppContext.Provider value={{workoutData, setWorkoutdata}}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route element={<AuthLayout />}>
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
