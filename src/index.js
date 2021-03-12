
import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import data from "./data";
import MainMap from "./MainMap";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import Hero from "./components/Hero";

const App = () => {
  return (
    <>
      
      <MainMap data={data} />
      <Hero />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
