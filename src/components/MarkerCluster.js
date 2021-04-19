import { useEffect } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useLeaflet } from "react-leaflet";
import { customMarker } from "./constants";

const mcg = L.markerClusterGroup();

const MarkerCluster = ({ markers }) => {
  const { map } = useLeaflet();

  useEffect(() => {
    mcg.clearLayers();
    markers.forEach(({ position, text }) =>
      L.marker(new L.LatLng(position.lat, position.lng), {
        icon: customMarker,
      })
        .addTo(mcg)
        .bindPopup(text)
    );

    map.addLayer(mcg);
  }, [markers, map]);

  return null;
};

MarkerCluster.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.objectOf(PropTypes.number).isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default MarkerCluster;
