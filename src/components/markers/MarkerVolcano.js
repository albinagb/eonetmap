import L from "leaflet";

const type = "volcano";

export const MarkerVolcano = new L.divIcon({
  className: type,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
