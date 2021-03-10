import React from "react";
import ReactDOM from "react-dom";
import data from "./data";
import MainMap from "./MainMap";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import Hero from "./components/Hero";

const App = () => {
  return (
    <>
      <Hero />
      <MainMap data={data} />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
