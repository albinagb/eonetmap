import React, { useState } from "react";

export default function Filters({ data, dataClean, PriceData, setMarkers }) {
  const [bedrooms, setBedrooms] = useState("All");
  const [status, setStatus] = useState("All");

  dataClean = [];

  if (bedrooms !== "All") {
    dataClean = [];
    data.forEach((element) => {
      if (element.Bedrooms == bedrooms) {
        dataClean.push({
          position: { lng: element.Longitude, lat: element.Latitude },
          text: PriceData(element),
        });
      }
    });
  }

  if (status !== "All") {
    dataClean = [];
    data.forEach((element) => {
      if (element.status === status) {
        dataClean.push({
          position: { lng: element.Longitude, lat: element.Latitude },
          text: PriceData(element),
        });
      }
    });
  }

  // Submit Function

  const handleSubmit = (event) => {
    event.preventDefault();
    setMarkers(dataClean);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bedrooms">
          Bedrooms
          <select
            id="bedrooms"
            value={bedrooms}
            onChange={(event) => setBedrooms(event.target.value)}
            onBloor={(event) => setBedrooms(event.target.value)}
          >
            <option>All</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </label>

        <label htmlFor="status">
          Status
          <select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            onBloor={(event) => setStatus(event.target.value)}
          >
            <option>All</option>
            <option>Available</option>
            <option>Removed</option>
          </select>
        </label>

        <input className="button" type="submit" value="Submit" />
      </form>
    </>
  );
}
