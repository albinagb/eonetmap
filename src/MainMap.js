import React, { useState } from "react";
import { Map, TileLayer } from "react-leaflet";
import Filters from "./Filters";
import MarkerCluster from "./MarkerCluster";

const position = [45.503, -73.595];
const mapStyle = { height: "90vh" };

function NewDataArray(data) {
  let dataClean = [];
  data.forEach((element) => {
    dataClean.push({
      position: { lng: element.Longitude, lat: element.Latitude },
      text: PriceData(element),
    });
  });
  return dataClean;
}

function PriceData(element) {
  let labelText = `No.: ${element.MlsNumber}, ${element.Bedrooms} rooms</br>
  ${element.ListingAddress}</br></br>`;
  const data = element.history;
  data[0].forEach((element, indx) => {
    labelText = `${labelText} ∙ ${element}: ${data[1][indx]} </br>`;
  });

  labelText = `${labelText}</br>${element.weeks_on_market} weeks on market</br>status: ${element.status}`;

  return labelText;
}

const MainMap = ({ data = [] }) => {
  let dataClean = NewDataArray(data);
  const [markers, setMarkers] = useState(dataClean);
  return (
    <>
      <Filters data={data} setMarkers={setMarkers} PriceData={PriceData} />
     
      <Map id="map" center={position} zoom={2} style={mapStyle} maxZoom={18}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerCluster markers={markers} />
      </Map>
      
    </>
  );
};

export default MainMap;
