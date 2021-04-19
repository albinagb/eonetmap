import axios from "axios";

export default axios.create({
  baseURL: "https://eonet.sci.gsfc.nasa.gov/api/v2.1",
});
