import React, { useEffect, useState } from "react";
import Api from "./api/Api";
import "leaflet/dist/leaflet.css";
import MainMap from "./components/MainMap";
import Loader from "./components/Loader";

const App = () => {
  const [responseData, setResponseData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await Api.get("/events", {})
      .then((res) => {
        const events = res.data.events;
        setResponseData(events);
        setLoading(false);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getData();
  }, []); // includes empty dependency array

  return <>{!loading ? <MainMap data={responseData} /> : <Loader />}</>;
};

export default App;
