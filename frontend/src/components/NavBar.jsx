import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { animated, useSpring } from "@react-spring/web";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import IndividualTogether from "./IndividualTogether";

const items = [
  {
    label: "PROFILE",
    key: "0",
    link: "https://www.calculator.net/calorie-calculator.html",
  },
  {
    key: "2",
    label: "TOGETHER",
    subItems: [{ label: "INDIVIDUAL", link: "/option1" }, { label: "GROUP" }],
  },
  {
    key: "3",
    label: "FITNESS",
    subItems: [
      {
        label: "CALORIES COUNTER",
        link: "https://www.calculator.net/calorie-calculator.html",
      },
      {
        label: " BODY INDEX",
        link: "https://www.calculator.net/bmi-calculator.html",
      },
      {
        label: " BMI CALCULATOR",
        link: "https://www.verywellhealth.com/body-mass-index-bmi-5210240",
      },
      {
        label: " FAT CALCULATOR",
        link: "https://www.calculator.net/body-fat-calculator.html",
      },
    ],
  },
  {
    key: "4",
    label: "MY PAGE",
    subItems: [
      { label: "Exercise Badges", link: "/option1" },
      { label: "Sleep Record", link: "/option1" },
    ],
  },
  {
    type: "divider",
  },

  {
    label: "METABOLIC RATE",
    key: "5",
    link: "https://www.calculator.net/body-fat-calculator.html",
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

  const handleClick = (link) => {
    window.open(link, "_blank");
  };

  const menuItems = (
    <Menu>
      {items.map((item) => (
        <React.Fragment key={item.key}>
          {item.subItems ? (
            <Menu.SubMenu key={item.key} title={item.label}>
              {item.subItems.map((subItem, index) => (
                <Menu.Item key={index}>
                  <Link to={subItem.link}>{subItem.label}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.key}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            </Menu.Item>
          )}
        </React.Fragment>
      ))}
    </Menu>
  );

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
                  overlay={menuItems}
                  trigger={["click"]}
                  className="mr-5"
                >
                  <a href="/" onClick={(e) => e.preventDefault()}>
                    <span className="material-symbols-outlined">
                      manage_accounts
                    </span>
                    <DownOutlined />
                  </a>
                </Dropdown>
                Welcome, {user.username}
              </span>
              <button onClick={logout}>Log Out</button>
            </div>
          )}
          {!user && (
            <div className="sm:text-red-800 mb-36 md:mb-0 lg:mb-0">
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
