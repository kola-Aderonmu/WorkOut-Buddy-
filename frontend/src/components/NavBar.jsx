import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { animated, useSpring } from "@react-spring/web";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const items = [
  {
    label: (
      <a
        href="https://www.calculator.net/calorie-calculator.html"
        target="_blank"
        rel="noopener noreferrer"
        className="shadow-lg font-mono"
      >
        CALORIES COUNTER
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a
        href="https://www.calculator.net/bmi-calculator.html"
        target="_blank"
        rel="noopener noreferrer"
        className="shadow-lg font-mono"
      >
        BODY INDEX
      </a>
    ),
    key: "1",
  },
  {
    label: (
      <a
        href="https://www.verywellhealth.com/body-mass-index-bmi-5210240"
        target="_blank"
        rel="noopener noreferrer"
        className="shadow-lg font-mono"
      >
        BMI CALCULATOR
      </a>
    ),
    key: "2",
  },
  {
    label: (
      <a
        href="https://www.calculator.net/body-fat-calculator.html"
        target="_blank"
        rel="noopener noreferrer"
        className="shadow-lg font-mono"
      >
        FAT CALCULATOR
      </a>
    ),
    key: "3",
  },
  {
    type: "divider",
  },
  {
    label: (
      <a
        href="https://www.calculator.net/body-fat-calculator.html"
        target="_blank"
        rel="noopener noreferrer"
        className="shadow-lg font-mono"
      >
        {" "}
        METABOLIC RATE{" "}
      </a>
    ),

    key: "3",
  },
];
const NavBar = () => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 20000 },
  });

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container bkgc">
        <Link to="/">
          <div className="workouts-logo-nav">
            <img
              src="https://th.bing.com/th/id/OIP.uGxAvne4RcWYuP_KnMJW5gHaHW?rs=1&pid=ImgDetMain"
              alt="workoutlogo"
              className="workout-logo"
            />
            <animated.h1 style={props} className="animated-heading">
              Workout Buddy
            </animated.h1>
          </div>
        </Link>
        <nav>
          {user && (
            <div>
              <span className="font-mono text-white ">
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                  className="mr-5"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <span class="material-symbols-outlined">
                      manage_accounts
                    </span>
                    <DownOutlined />
                  </a>
                </Dropdown>
                Welcome, {user.username}
              </span>
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
