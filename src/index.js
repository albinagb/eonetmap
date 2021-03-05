import React from "react";
import ReactDOM from "react-dom";
import data from "./data";
import MainMap from "./MainMap";
import "leaflet/dist/leaflet.css";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(<MainMap data={data} />, rootElement);
