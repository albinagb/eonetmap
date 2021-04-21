import { useEffect } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useLeaflet } from "react-leaflet";
import { MarkerFire } from "./markers/MarkerFire";
import { MarkerVolcano } from "./markers/MarkerVolcano";
import { MarkerIce } from "./markers/MarkerIce";
import { MarkerStorm } from "./markers/MarkerStorm";
import { MarkerOther } from "./markers/MarkerOther";

const mcg = L.markerClusterGroup({
  maxClusterRadius: 50,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
});

const MarkerCluster = ({ markers }) => {
  const { map } = useLeaflet();

  useEffect(() => {
    mcg.clearLayers();

    markers.forEach(({ position, text, type }) =>
      L.marker(new L.LatLng(position.lat, position.lng), {
        icon: assignMarker(type),
      })
        .addTo(mcg)
        .bindPopup(text)
    );

    map.addLayer(mcg);
  }, [markers, map]);

  return null;
};

function assignMarker(type) {
  if (type === "volcano") {
    return MarkerVolcano;
  } else if (type === "red-fire") {
    return MarkerFire;
  } else if (type === "ice") {
    return MarkerIce;
  } else if (type === "storm") {
    return MarkerStorm;
  } else {
    return MarkerOther;
  }
}

MarkerCluster.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.objectOf(PropTypes.number).isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default MarkerCluster;
