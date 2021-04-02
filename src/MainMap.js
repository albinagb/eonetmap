import React, { useState } from "react";
import { Map, TileLayer } from "react-leaflet";
import Filters from "./components/Filters";
import MarkerCluster from "./components/MarkerCluster";
import { customMarker } from "./components/constants";
import { RedMarker } from "./components/RedMarker";

const position = [45.503, -73.595];
const mapStyle = { height: "100vh" };

function NewDataArray(data) {
  let dataClean = [];
  data.forEach((element) => {
    if (element.status === "Available") {
      dataClean.push({
        position: { lng: element.Longitude, lat: element.Latitude },
        text: PriceData(element),
        style: customMarker,
      });
    } else if (element.status === "Removed") {
      dataClean.push({
        position: { lng: element.Longitude, lat: element.Latitude },
        text: PriceData(element),
        style: RedMarker,
      });
    }
  });
  return dataClean;
}

function PriceData(element) {
  let labelText = `No.: <a target="blank" href="${element.url}">${
    element.MlsNumber
  }</a>: ${element.Bedrooms} rooms, ${element.Parking} parking${
    element.year === 0 ? "" : `, year ` + element.year
  }</br></br>
  ${element.ListingAddress}</br></br>`;
  const data = element.history;
  data[0].forEach((element, indx) => {
    labelText = `${labelText} ∙ ${element}: ${data[1][indx]} </br>`;
  });

  labelText = `${labelText}</br>${element.weeks_on_market} weeks on market</br>status as of ${element.updated}: ${element.status}`;

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
        PriceData={PriceData}
        markers={markers}
      />
    </>
  );
};

export default MainMap;
