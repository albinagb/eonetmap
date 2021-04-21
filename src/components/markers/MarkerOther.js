import L from "leaflet";

const type = "other";

export const MarkerOther = new L.divIcon({
  className: type,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
