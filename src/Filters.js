import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import icon from "./images/icon.png";
import { customMarker } from "./constants";
import { RedMarker } from "./RedMarker";
import { Form, Segment } from "semantic-ui-react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

// Material UI CSS

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  "@global": {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    ".MuiSlider-thumb": {
      color: "white",
    },
    ".MuiSlider-root": {
      color: "white",
    },
    ".PrivateValueLabel-label-5": {
      color: "#367250",
      fontSize: "0.1rem",
    },
  },
})(() => null);

// some inline styles (we should move these to our index.css at one stage)
const segmentStyle = {
  zIndex: 999,
  background: "hsla(146, 36%, 33%, 0.7)",
  position: "absolute",
  width: "350px",
  top: "30px",
  left: "50px",
  maxHeight: "calc(100vh - 5vw)",
  overflow: "auto",
  padding: "5px",
};

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

  // let propertyDataKeys = Object.keys(data[0]).map((el) => {
  //   console.log(el);
  // });

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

  // ....

  return (
    <>
      <Segment style={segmentStyle}>
        <Form className="form" onSubmit={handleSubmit}>
          <div className="ui grid">
            <div className="three column row ">
              <div className="three wide column">
                <a href="/">
                  <img src={icon} id="icon" alt="map search icon" />
                </a>
              </div>
              <div className="left floated column">
                <h2>Filters</h2>
              </div>
              <div className="right floated column right aligned">
                <i aria-hidden="true" className="close link icon"></i>
              </div>
            </div>

            <div className="two column row">
              <label className="left floated column" htmlFor="bedrooms">
                Bedrooms
                <select
                  className="ui dropdown mr-top"
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
                  className="ui dropdown item mr-top"
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
              <label className="eight wide column mr-top" htmlFor="mls">
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
                  className="ui dropdown mr-top"
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
            </div>
          </div>

          <div id="chxContainer">
            <p id="chxName">New:</p>
            <label className="checkbox four wide column">
              <input
                className="ui checkbox"
                id=""
                type="checkbox"
                value="{checked}"
                onChange={() => setChecked((checked) => !checked)}
              />
            </label>
          </div>

          <div className="sliderBox">
            <div>
              <GlobalCss />
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

          <input className="small ui button" type="submit" value="Submit" />
        </Form>
      </Segment>
    </>
  );
}

//

// const draggable = useState(false);
// draggable={draggable}
