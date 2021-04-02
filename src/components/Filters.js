import React, { useState, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import icon from "./images/icon.png";
import { customMarker } from "./constants";
import { RedMarker } from "./RedMarker";
import { Form } from "semantic-ui-react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useSpring, useChain, config, animated } from "react-spring";
import { Container } from "./styles";

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
      fontSize: "9px",
    },
    ".ui.form select": {
      color: "#367250",
    },
    ".ui.checkbox": {
      margin: "0.21rem 0 0 0",
      width: "5rem",
    },
  },
})(() => null);

// const segmentStyle = {
//   maxHeight: "calc(100vh - 3vw)",

// };

// css ends here

const WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const BEDROOMS = [1, 2, 3, 4];

export default function Filters({ data, PriceData, setMarkers }) {
  const [bedrooms, setBedrooms] = useState("All");
  const [status, setStatus] = useState("All");
  const [price, setPrice] = useState([0, 600000]);
  const [mls, setMls] = useState("");
  const [weeks, setWeeks] = useState("");
  const [checked, setChecked] = useState(false);
  const [year, setYear] = useState("All");

  // btn toggle function

  const [isOpen, setIsOpen] = useState(false);

  // ...

  // Spring Animation

  const springRef = useRef();
  const { size1, size2, opacity, transform, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: {
      size1: "80px",
      size2: "80px",
      background: "#367250",
      transform: "50px",
    },
    to: {
      size1: isOpen ? "380px" : "80px",
      size2: isOpen ? "650px" : "80px",
      background: isOpen
        ? "hsla(146, 36%, 33%, 0.7)"
        : "hsla(146, 36%, 33%, 0.7)",
      transform: isOpen ? "70px" : "50px",
    },
  });

  useChain(isOpen ? [springRef] : [springRef]);

  const rangeSelector = (e, newValue) => {
    setPrice(newValue);
  };

  // Object keys
  // let propertyDataKeys = Object.keys(data[0]).map((el) => {
  //   console.log(el);
  // });

  // Filters
  data = data.filter(
    (item) => item.Price >= price[0] && item.Price <= price[1]
  );

  if (mls !== "") {
    data = data.filter((el) => el.MlsNumber == mls);
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

  if (weeks !== "Over") {
    data = data.filter((item) => item.weeks_on_market >= weeks);
  }

  if (year !== "All") {
    if (year === "2005 or after") {
      data = data.filter((item) => item.year >= 2005);
    }
    if (year === "2015 or after") {
      data = data.filter((item) => item.year >= 2015);
    }
    if (year === "uknown") {
      data = data.filter((item) => item.year === 0);
    }
  }

  // Status

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

  const newStyle = isOpen ? { visibility: "visible" } : { display: "none" };

  // ....

  return (
    <>
      <Container
        style={{
          ...rest,
          width: size1,
          height: size2,
          top: transform,
          left: transform,
        }}
      >
        <GlobalCss />
        <Form className="form" onSubmit={handleSubmit}>
          <div className="ui grid">
            <div className="three column row ">
              <div className="three wide column">
                <div className="form-btn">
                  <img
                    src={icon}
                    id="icon"
                    alt="map search icon"
                    onClick={() => setIsOpen((isOpen) => !isOpen)}
                  />
                </div>
              </div>
              <div className="left floated column" style={newStyle}>
                <h2>Filters</h2>
              </div>
              <div className="form-btn right floated column right aligned">
                <i
                  aria-hidden="true"
                  className="icon-custom"
                  role="img"
                  aria-label="Cancel"
                  style={newStyle}
                  onClick={() => setIsOpen((isOpen) => !isOpen)}
                ></i>
              </div>
            </div>

            <div className="three column row" style={newStyle}>
              <label className="six wide column" htmlFor="status">
                Status
                <select
                  className="ui dropdown item mr-top"
                  id="status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  style={newStyle}
                >
                  <option>All</option>
                  <option>Available</option>
                  <option>Removed</option>
                </select>
              </label>

              <label className="five wide column" htmlFor="bedrooms">
                Bedrooms
                <select
                  className="ui dropdown mr-top"
                  id="bedrooms"
                  value={bedrooms}
                  onChange={(event) => setBedrooms(event.target.value)}
                  style={newStyle}
                >
                  <option>All</option>
                  {BEDROOMS.map((bedrooms) => (
                    <option key={bedrooms} value={bedrooms}>
                      {bedrooms}
                    </option>
                  ))}
                </select>
              </label>

              <label
                className="five wide column"
                htmlFor="status"
                style={newStyle}
              >
                Year
                <select
                  className="ui dropdown item mr-top"
                  id="year"
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  style={newStyle}
                >
                  <option>All</option>
                  <option>2005 or after</option>
                  <option>2015 or after</option>
                  <option>unknown year</option>
                </select>
              </label>
            </div>

            <div className="ui inverted divider" style={newStyle}></div>

            <div className="sliderBox" style={newStyle}>
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
                <p id="thirdPf">
                  Price is between {price[0]} and {price[1]}{" "}
                </p>
              </div>
            </div>

            <div className="three column row" style={newStyle}>
              <label className="eight wide column" htmlFor="mls">
                <p id="secondPf">Search by ID_</p>
                <input
                  className=""
                  id="mls"
                  value={mls}
                  placeholder="ID_"
                  onChange={(e) => setMls(e.target.value)}
                />
              </label>

              <div id="chxContainer">
                New:
                <label className="four wide column">
                  <input
                    className="ui checkbox"
                    type="checkbox"
                    value="{checked}"
                    onChange={() => setChecked((checked) => !checked)}
                  />
                </label>
              </div>
            </div>

            <div className="ui inverted divider" style={newStyle}></div>

            <div className="two column row" style={newStyle}>
              <label className=" left floated column" htmlFor="weeks">
                <p id="weeks"> Weeks</p>
                <select
                  className="ui dropdown mr-top"
                  id="weeks"
                  value={weeks}
                  onChange={(e) => setWeeks(e.target.value)}
                  onBlur={(e) => setWeeks(e.target.value)}
                  style={newStyle}
                >
                  <option>Over</option>
                  {WEEKS.map((weeks) => (
                    <option key={weeks} value={weeks}>
                      {weeks}
                    </option>
                  ))}
                </select>
              </label>

              <div className="right floated column"></div>
            </div>
          </div>

          <button id="button" type="submit" value="Submit" style={newStyle}>
            Submit
          </button>
        </Form>
      </Container>
    </>
  );
}
