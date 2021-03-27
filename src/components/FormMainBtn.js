import React, { useState } from "react";
import icon from "./images/icon.png";

export default function FormMainBtn() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div id="searchIconBox" onClick={() => setIsOpen(!isOpen)}>
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
