import React from "react";
import icon from "./images/icon.png";

export default function FormMainBtn({ styleBtn }) {
  return (
    <div id="searchIconBox" style={styleBtn}>
      <div className="form-btn">
        <img src={icon} id="iconInBox" alt="map search icon" />
      </div>
    </div>
  );
}

// {
//   isOpen ? "Open" : "Closed";
// }

// isOpen = { isOpen };
