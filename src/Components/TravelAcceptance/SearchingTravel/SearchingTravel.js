import React from "react";

const searchingTravel = props => {
  const { elem } = props;

  const textToShow = elem
    ? `${elem.name} (lat:${elem.location.coordinates[1]}, long:${
        elem.location.coordinates[0]
      }), se encuentra buscando Viaje ...`
    : "Vuelve al inicio !";

  return <div>{textToShow}</div>;
};

export default searchingTravel;
