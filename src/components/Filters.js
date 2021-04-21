import { useState, useRef, useEffect } from "react";
import icon from "./images/icon.png";
import { Form } from "semantic-ui-react";
import { useSpring, useChain, config, animated } from "react-spring";
import { Container } from "./styles";
import Description from "./Description";

export default function Filters({ data, Title, setMarkers }) {
  const [categories, setCategories] = useState("All");

  // Spring Animation

  const [isOpen, setIsOpen] = useState();
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
      size1: isOpen ? "360px" : "90px",
      size2: isOpen ? "470px" : "90px",
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

  useEffect(() => {
    if (!isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  // Filters

  const CATEGORIES = [
    "Wildfires",
    "Severe Storms",
    "Volcanoes",
    "Sea and Lake Ice",
  ];

  if (categories !== "All") {
    data = data.filter((item) => item.categories[0].title === categories);
  }

  // Status

  let dataClean = [];

  data.forEach((element) => {
    if (
      element.categories[0].id &&
      typeof element.geometry[0].coordinates[1] == "number"
    ) {
      dataClean.push({
        position: {
          lng: element.geometry[0].coordinates[0],
          lat: element.geometry[0].coordinates[1],
        },
        text: Title(element),
        type: AssignType(element),
      });
    }
  });

  function AssignType(element) {
    if (element.categories[0].id === "volcanoes") {
      return "volcano";
    } else if (element.categories[0].id === "wildfires") {
      return "red-fire";
    } else if (element.categories[0].id === "severeStorms") {
      return "storm";
    } else if (element.categories[0].id === "seaLakeIce") {
      return "ice";
    } else {
      return "ice";
    }
  }

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
        <AnimatedForm
          style={{ ...rest2, display, opacity2, transform2 }}
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="ui grid">
            <div className="three column row">
              <div className="three wide column"></div>
              <div className="left floated column">
                <h2>Information</h2>
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
            <Description />
            <div className="two column row cont-box">
              <label
                className="ten wide left floated column"
                htmlFor="categories"
              >
                Category Filter
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
              <div id="subtn" className="right floated column">
                <button
                  className="ui white basic inverted button"
                  type="submit"
                  value="Submit"
                >
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
