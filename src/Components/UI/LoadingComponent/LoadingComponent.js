import React from "react";

const loadingComponent = props => {
  let { additionalText = "" } = props;

  additionalText = additionalText ? (additionalText += " ") : additionalText;

  return <div>{"Cargando " + additionalText + "..."} </div>;
};

export default loadingComponent;
