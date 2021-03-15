import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Filters({ data, PriceData, setMarkers }) {
  const [bedrooms, setBedrooms] = useState("All");
  const [status, setStatus] = useState("All");
  const [price, setPrice] = useState([0, 600000]);
  const [mls, setMls] = useState("");
  const [weeks, setWeeks] = useState("");
  const [checked, setChecked] = useState(false);

  const rangeSelector = (e, newValue) => {
    setPrice(newValue);
    // console.log(`Value 1: ${newValue[0]} ---  Value 2: ${newValue[1]}`)
  };

  // Object keys

//  let propertyDataKeys = (Object.keys(data[0]).map(el => {
//     console.log(el)
//   }));
  
  data = data.filter((item) => (item.Price >= price[0])&&(item.Price <= price[1]));
  
  if(mls !== "") {
    data = data.filter((el) => (el.MlsNumber == mls));
  }

  if (weeks !== "Over") {
    data = data.filter((item) => item.weeks_on_market >= weeks);
  } 
  

  if (bedrooms !== "All") {
    data = data.filter((item) => item.Bedrooms == bedrooms);
  }

  if (status !== "All") {
    data = data.filter((item) => item.status === status);
  }

  if (checked) {
    data = data.filter((el) => el.weeks_on_market == 0);
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
      <form className="mx-4 my-3 row gx-3 gy-2 align-items-center" onSubmit={handleSubmit}>
        
          <label className= "col-sm-1" htmlFor="bedrooms">
            Bedrooms
            <select
              className = "form-control" 
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

          <label className= "col-sm-1" htmlFor="status">
            Status
            <select 
              className = "form-control" 
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option>All</option>
              <option>Available</option>
              <option>Removed</option>
            </select>
          </label>

          <label className= "col-sm-2" htmlFor="mls"> Search by MLS 
          <input className = "form-control" id="mls" 
          value={mls} 
          placeholder="MLS"
          onChange={(e) => setMls(e.target.value)} /> 
          </label>

          <label className= "col-sm-1"  htmlFor="weeks">
          Weeks
          <select
          className = "form-control" 
            id="weeks"
            value={weeks}
            onChange={(e) => setWeeks(e.target.value)}
            onBlur={(e) => setWeeks(e.target.value)}
          >
           <option>Over</option>
            {WEEKS.map((weeks) => (
              <option key={weeks} value={weeks}>
                {weeks}
              </option>
            ))}
          </select>
        </label>
         
        <label className="btn btn-outline-secondary">
          New:
          <input
          // className="form-check-input big-cx"
          className="btn-check big-cx" id="btn-check-outlined"
            type="checkbox"
            value="{checked}"
            onChange={() => setChecked((checked) => !checked)}
          />
        </label>

          <div className= "col-sm-3" id="sliderBox">
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
            Price is between {price[0]} and {price[1]}
          </div>
          <input className="btn btn-light col-auto" type="submit" value="Submit" />
        
      </form>
    </>
  );
}
