import React, { useState } from "react";

export default function Filters({ data, dataClean, PriceData, setMarkers }) {
  const [checked, setChecked] = useState(false);
  // const [optionsState, setSelected] = useState("");

  dataClean = [];

  if (checked) {
    data.forEach((element) => {
      if (element.Bedrooms === 2) {
        dataClean.push({
          position: { lng: element.Longitude, lat: element.Latitude },
          text: PriceData(element),
        });
      }
    });
  } else {
    console.log(`not checked ${dataClean.length}`);
    data.forEach((element) => {
      dataClean.push({
        position: { lng: element.Longitude, lat: element.Latitude },
        text: PriceData(element),
      });
    });
  }

  // Submit Function

  console.log(`global ${dataClean.length}`);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMarkers(dataClean);
    console.log(`2 handleSubmit ${dataClean.length}`);
  };

  // Check the status of properties

  // function handleChange(e) {
  //   setSelected(e.target.value);
  // }

  // function showStatus(e) {
  //   dataClean = [];
  //   console.log(`showStatus e ${e}`);
  //   if (e === "removed") {
  //     let statusResult = data.filter((element) => element.status === "Removed");
  //     statusResult.forEach((element) => {
  //       dataClean.push({
  //         position: { lng: element.Longitude, lat: element.Latitude },
  //         text: PriceData(element),
  //       });
  //     });
  //     console.log(dataClean);
  //   } else if (e === "available") {
  //     let statusResult = data.filter(
  //       (element) => element.status === "Available"
  //     );
  //     statusResult.forEach((element) => {
  //       dataClean.push({
  //         position: { lng: element.Longitude, lat: element.Latitude },
  //         text: PriceData(element),
  //       });
  //     });
  //     console.log(dataClean);
  //   }
  //   console.log(`showStatus ${dataClean.length}`);
  //   return dataClean;
  // }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          2 bedrooms:
          <input
            type="checkbox"
            value="{checked}"
            onChange={() => setChecked((checked) => !checked)}
          />
        </label>

        <input className="button" type="submit" value="Submit" />
      </form>
    </>
  );
}
