import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

export default function Filters({ data, PriceData, setMarkers }) {
  const [bedrooms, setBedrooms] = useState("All");
  const [status, setStatus] = useState("All");
  const [price, setPrice] = useState([0, 600000]);

  const rangeSelector = (e, newValue) => {
    setPrice(newValue);
    // console.log(`Value 1: ${newValue[0]} ---  Value 2: ${newValue[1]}`)
  };
  
  // console.log(`price: ${price}`)
  
  data = data.filter((item) => (item.Price >= price[0])&&(item.Price <= price[1]));

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
        <div className="filterBox">
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
          <div id="sliderBox">
            <Typography id="range-slider" gutterBottom>
              Select Price Range:
            </Typography>
            <Slider
              value={price}
              min={0}
              step={25000}
              max={600000}
              onChange={rangeSelector}
              valueLabelDisplay="auto"
            />
            Price is between {price[0]} /- and {price[1]} /-
          </div>
          <input className="button" type="submit" value="Submit" />
        </div>
        
      </form>
    </>
  );
}
