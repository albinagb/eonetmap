import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import data from "./components/data";
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
