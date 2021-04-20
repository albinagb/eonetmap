import React, { useState } from "react";
import { Map, TileLayer } from "react-leaflet";
import Filters from "./components/Filters";
import MarkerCluster from "./components/MarkerCluster";
import { customMarker } from "./components/constants";

const position = [8.783, 34.508];
const mapStyle = { height: "100vh" };

function NewDataArray(data, i) {
  let dataClean = [];
  data.forEach((element) => {
    console.log(element.categories[0].id);
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
        style: customMarker,
      });
    }
  });
  return dataClean;
}

function TitleData(element) {
  let labelText = `Type of disaster: ${element.categories[0].title}
  </br></br>
  ID: ${element.id}
  </br></br>
  Location: ${element.title}`;

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
        markers={markers}
      />
    </>
  );
};

export default MainMap;
