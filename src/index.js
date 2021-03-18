
import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import data from "./data";
import MainMap from "./MainMap";
import "leaflet/dist/leaflet.css";
import "./styles.css";

const App = () => {
  return (
    <>
      <MainMap data={data} />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
