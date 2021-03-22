import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import { customMarker } from "./constants";
import { RedMarker } from "./RedMarker";
import { Form, Button, Select } from "semantic-ui-react";

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

  data = data.filter(
    (item) => item.Price >= price[0] && item.Price <= price[1]
  );

  if (mls !== "") {
    data = data.filter((el) => el.MlsNumber == mls);
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
    if (element.status === "Available") {
      dataClean.push({
        position: { lng: element.Longitude, lat: element.Latitude },
        text: PriceData(element),
        style: customMarker,
      });
    } else if (element.status === "Removed") {
      dataClean.push({
        position: { lng: element.Longitude, lat: element.Latitude },
        text: PriceData(element),
        style: RedMarker,
      });
    }
  });

  // Submit Function
  const handleSubmit = (event) => {
    event.preventDefault();
    setMarkers(dataClean);
  };

  return (
    <>
      <Form className="greenForm " onSubmit={handleSubmit}>
        <div className="ui grid">
          <div className="two column row">
            <div className="left floated column">
              <h2>Filters</h2>
            </div>
            <div className="right floated column">
              <i aria-hidden="true" className="close link icon"></i>
            </div>
          </div>

          <div className="two column row">
            <label className="left floated column" htmlFor="bedrooms">
              Bedrooms
              <select
                className=""
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

            <label className="right floated column" htmlFor="status">
              Status
              <select
                className="ui dropdown item"
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option>All</option>
                <option>Available</option>
                <option>Removed</option>
              </select>
            </label>
          </div>

          <div className="three column row">
            <label className="six wide column" htmlFor="mls">
              {" "}
              Search by MLS
              <input
                className=""
                id="mls"
                value={mls}
                placeholder="MLS"
                onChange={(e) => setMls(e.target.value)}
              />
            </label>

            <label className="six wide column" htmlFor="weeks">
              Weeks
              <select
                className=""
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

            <label className="four wide column">
              New:
              <input
                className="ui checkbox"
                id=""
                type="checkbox"
                value="{checked}"
                onChange={() => setChecked((checked) => !checked)}
              />
            </label>
          </div>
        </div>

        <div className="sliderBox">
          <div>
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
        </div>

        <input className="ui button" type="submit" value="Submit" />
      </Form>
    </>
  );
}
