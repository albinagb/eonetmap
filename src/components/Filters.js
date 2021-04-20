import React, { useState, useRef, useEffect } from "react";
import icon from "./images/icon.png";
import { customMarker } from "./constants";
import { Form } from "semantic-ui-react";
import { withStyles } from "@material-ui/core/styles";
import { useSpring, useChain, config, animated } from "react-spring";
import { Container } from "./styles";

// Material UI and Semantic UI CSS changed in Global CSS
const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  "@global": {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    ".PrivateValueLabel-label-5": {
      color: "gray",
      fontSize: "9px",
    },
    ".ui.form select": {
      color: "gray",
    },
    ".ui.checkbox": {
      margin: "0.21rem 0 0 0",
      width: "5rem",
    },
  },
})(() => null);

const CATEGORIES = ["wildfires", "severeStorms", "volcanoes", "seaLakeIce"];

export default function Filters({ data, Title, setMarkers }) {
  const [categories, setCategories] = useState("All");
  const [status, setStatus] = useState("All");

  // btns toggle function

  const [isOpen, setIsOpen] = useState();

  // ...

  // Spring Animation

  const AnimatedForm = animated(Form);

  const springRef = useRef();
  const { size1, size2, opacity, transform, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: {
      size1: "90px",
      size2: "90px",
      background: "#8686e8",
      transform: "50px",
    },
    to: {
      size1: isOpen ? "400px" : "90px",
      size2: isOpen ? "220px" : "90px",
      background: isOpen ? "hsla(240, 60%, 62%, 0.9)" : "#8686e8",
      transform: isOpen ? "70px" : "50px",
    },
  });

  // 2nd "inside elements animation"

  const transRef = useRef();
  const { display, opacity2, transform2, ...rest2 } = useSpring({
    ref: transRef,
    from: {
      opacity2: 0,
      transform2: "scale(1)",
      display: "none",
    },
    to: {
      transform2: isOpen ? "scale(1)" : "scale(0)",
      display: isOpen ? "inline" : "none",
      opacity2: isOpen ? 1 : 0,
    },
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(isOpen ? [springRef, transRef] : [transRef, springRef], [
    0,
    isOpen ? 0.1 : 0.3,
  ]);

  useEffect(() => {}, []);

  // Object keys
  // let propertyDataKeys = Object.keys(data[0]).map((el) => {
  //   console.log(el);
  // });

  // Filters

  if (categories !== "All") {
    data = data.filter((item) => item.categories[0].id === categories);
  }

  if (status !== "All") {
    data = data.filter((item) => item.status === status);
  }

  // Status

  let dataClean = [];

  data.forEach((element) => {
    if (element.status === "Available") {
      dataClean.push({
        position: { lng: element.Longitude, lat: element.Latitude },
        text: Title(element),
        style: customMarker,
      });
    } else if (element.status === "Removed") {
      dataClean.push({
        position: { lng: element.Longitude, lat: element.Latitude },
        text: Title(element),
        // style: RedMarker,
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
      <Container
        style={{
          ...rest,
          width: size1,
          height: size2,
          top: transform,
          left: transform,
        }}
      >
        <div
          className="search-icon"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          style={isOpen ? { visibility: "visible" } : { visibility: "visible" }}
        >
          <img src={icon} id="icon" alt="map search icon" />
        </div>
        <GlobalCss />
        <AnimatedForm
          style={{ ...rest2, display, opacity2, transform2 }}
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="ui grid">
            <div className="three column row">
              <div className="three wide column"></div>
              <div className="left floated column">
                <h2>Filters</h2>
              </div>
              <div className="right floated column right aligned">
                <i
                  aria-hidden="true"
                  className="icon-custom"
                  role="img"
                  aria-label="Cancel"
                  onClick={() => setIsOpen((isOpen) => !isOpen)}
                  style={
                    isOpen ? { visibility: "visible" } : { display: "none" }
                  }
                ></i>
              </div>
            </div>
            <div className="three column row cont-box">
              <label className="six wide column" htmlFor="status">
                Status
                <select
                  className="ui dropdown item mr-top"
                  id="status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option>All</option>
                  <option>closed</option>
                  <option>open</option>
                </select>
              </label>

              <label className="five wide column" htmlFor="bedrooms">
                Categories
                <select
                  className="ui dropdown mr-top"
                  id="categories"
                  value={categories}
                  onChange={(event) => setCategories(event.target.value)}
                >
                  <option>All</option>
                  {CATEGORIES.map((categories) => (
                    <option key={categories} value={categories}>
                      {categories}
                    </option>
                  ))}
                </select>
              </label>
              <div className="five wide column">
                <button id="button" type="submit" value="Submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </AnimatedForm>
      </Container>
    </>
  );
}
