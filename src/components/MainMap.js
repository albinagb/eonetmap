import React, { useState } from "react";
import { Map, TileLayer } from "react-leaflet";
import Filters from "./Filters";
import MarkerCluster from "./MarkerCluster";

const position = [8.783, 34.508];
const mapStyle = { height: "100vh" };

function NewDataArray(data, i) {
  let dataClean = [];
  data.forEach((element) => {
    if (
      element.categories[0].id &&
      typeof element.geometry[0].coordinates[1] == "number"
    ) {
      dataClean.push({
        position: {
          lng: element.geometry[0].coordinates[0],
          lat: element.geometry[0].coordinates[1],
        },
        text: TitleData(element),
        tooltip: MakeToolTip(element),
        type: AssignType(element),
      });
    }
  });
  return dataClean;
}

function AssignType(element) {
  if (element.categories[0].id === "volcanoes") {
    return "volcano";
  } else if (element.categories[0].id === "wildfires") {
    return "red-fire";
  } else if (element.categories[0].id === "severeStorms") {
    return "storm";
  } else if (element.categories[0].id === "seaLakeIce") {
    return "ice";
  } else {
    return "other";
  }
}

function TitleData(element) {
  let labelText = `Type of disaster: ${element.categories[0].title}
  </br>
  ID: ${element.id}
  </br>
  Location: <a href="https://www.google.com/search?q=${element.title}" target="_blank">${element.title}</a>`;

  return labelText;
}

function MakeToolTip(element) {
  let labelText = `${element.title}`;
  return labelText;
}

const MainMap = ({ data = [] }) => {
  let dataClean = NewDataArray(data);

  const [markers, setMarkers] = useState(dataClean);

  return (
    <>
      <Map center={position} zoom={2} style={mapStyle} maxZoom={18}>
        <TileLayer
          className="test"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerCluster markers={markers} />
      </Map>
      <Filters
        data={data}
        setMarkers={setMarkers}
        Title={TitleData}
        MakeToolTip={MakeToolTip}
        markers={markers}
      />
    </>
  );
};

export default MainMap;
