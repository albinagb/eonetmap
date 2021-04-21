import React from "react";

let myUrl = "https://albinagb.github.io";
let nasaUrl = "https://eonet.sci.gsfc.nasa.gov/";

class Description extends React.Component {
  render() {
    return (
      <div id="description-block">
        <p>
          This Geo Data project is based on an Earth Observatory Natural Events
          Tracker API
          <a className="link" target="blank" href={nasaUrl}>
            provided by NASA
          </a>
          . The API returns currently active natural disasters.
        </p>
        <p>
          Technologies used: React, Leaflet React Libraries, CSS and Animation
          with Styled Components, React Spring and Semantic UI. Designed in
          Sketch.
        </p>
        <p>
          Author:
          <a className="link" target="blank" href={myUrl}>
            Albina G
          </a>
          , 2021
        </p>
      </div>
    );
  }
}

export default Description;
