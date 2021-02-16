import React from "react";
import { useSelector } from "react-redux";

import logo from "../../react.svg";
import { INCREMENT, DECREMENT } from "../../app/action";
import store from "../../app/store";
import Header from "../../components/header";

import "./Home.css";

const Home = () => {
  const counter = useSelector((state) => state.value);
  const handleIncr = () => store.dispatch(INCREMENT);
  const handleDecr = () => store.dispatch(DECREMENT);
  return (
    <div className="Home">
      <Header logo={logo} />
      <p className="Home-intro">A Redux loop counter</p>
      <div>
        <button onClick={handleDecr}>-</button>
        <span>{counter}</span>
        <button onClick={handleIncr}>+</button>
      </div>
    </div>
  );
};

export default Home;
