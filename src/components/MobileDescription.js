import React from "react";

let myUrl = "https://albinagb.github.io";
let nasaUrl = "https://eonet.sci.gsfc.nasa.gov/";

class MobileDescription extends React.Component {
  render() {
    return (
      <div id="description-block-mobile">
        <p>
          This Geo Data project is based on an Earth Observatory Natural Events
          Tracker API
          <a className="link" target="blank" href={nasaUrl}>
            provided by NASA .
          </a>
        </p>
        <p>
          Technologies used: React, Leaflet Map Libraries, React Spring,
          Semantic UI, etc.
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

export default MobileDescription;
