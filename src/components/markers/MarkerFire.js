import L from "leaflet";

const type = "red-fire";

export const MarkerFire = new L.divIcon({
  className: type,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
