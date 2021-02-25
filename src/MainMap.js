import React, { useState } from "react";
import { Map, TileLayer } from "react-leaflet";

import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import MarkerCluster from "./MarkerCluster";
import data from "./data";

const position = [45.503, -73.595];
const mapStyle = { height: "90vh" };

let dataClean = [];

data.forEach((element) => {
  dataClean.push({
    position: { lng: element.Longitude, lat: element.Latitude },
    text: priceData(element),
  });
});

// Search Element

function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      marker: {
        icon,
      },
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, []);

  return null;
}

// Price Data Log function

function priceData(element) {
  let labelText = `No.: ${element.MlsNumber}, ${element.Bedrooms} rooms</br>
  ${element.ListingAddress}</br></br>`;
  const data = element.history;
  data[0].forEach((element, indx) => {
    labelText = `${labelText} ∙ ${element}: ${data[1][indx]} </br>`;
  });

  labelText = `${labelText}</br>${element.days_on_market} days on market</br>status: ${element.status}`;

  return labelText;
}

const MainMap = () => {
  const [markers, setMarkers] = useState(dataClean);

  const handleClick = () => {
    setMarkers(dataClean);
  };

  return (
    <>
      <Map center={position} zoom={2} style={mapStyle} maxZoom={18}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LeafletgeoSearch />
        <MarkerCluster markers={markers} />
      </Map>
      <button onClick={handleClick}>Change cluster</button>
    </>
  );
};

export default MainMap;

// [

// {
//   position: { lng: data.venues[0].lng, lat: data.venues[0].lat },
//   text: data.venues[0].ListingAddress,
// },
// {
//   position: { lng: data.venues[1].lng, lat: data.venues[1].lat },
//   text: data.venues[1].ListingAddress,
// },
// {
//   position: { lng: data.venues[2].lng, lat: data.venues[2].lat },
//   text: data.venues[2].ListingAddress,
// },
// {
//   position: { lng: data.venues[3].lng, lat: data.venues[3].lat },
//   text: data.venues[3].ListingAddress,
// },
//   ]
