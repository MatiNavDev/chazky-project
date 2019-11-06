import React from "react";

const searchingTravel = props => {
  const { elem } = props;

  let textToShow = elem
    ? `${elem.name} (lat:${elem.location.coordinates[1]}, long:${
        elem.location.coordinates[0]
      }), se encuentra buscando Viaje ...`
    : "Vuelve al inicio !";

  if (elem.shareVehicle === true) {
    textToShow += " (SI comparte vehiculo)";
  } else if (elem.shareVehicle === false) {
    textToShow += " (NO comparte vehiculo)";
  }
  return <div>{textToShow}</div>;
};

export default searchingTravel;
