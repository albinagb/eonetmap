import React, { useState } from "react";

export default function Filters({ data, PriceData, setMarkers }) {
  const [bedrooms, setBedrooms] = useState("All");
  const [status, setStatus] = useState("All");

  if (bedrooms !== "All") {
    data = data.filter((item) => item.Bedrooms == bedrooms);
  }

  if (status !== "All") {
    data = data.filter((item) => item.status === status);
    // console.log(`data status: ${data.length}`);
  }

  let dataClean = [];
  data.forEach((element) => {
    dataClean.push({
      position: { lng: element.Longitude, lat: element.Latitude },
      text: PriceData(element),
    });
  });

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
