import React from "react";
import ReactDOM from "react-dom";

import "leaflet/dist/leaflet.css";
import "./styles.css";
import MainMap from "./MainMap";

const App = () => <MainMap />;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
