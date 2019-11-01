import React from 'react';

const travelInformation = props => {
  const { description, time } = props;

  return (
    <div>
      <div>{description}</div>
      <div>{'Faltan ' + time + 'para que llegue tu vehiculo !'}</div>
    </div>
  );
};

export default travelInformation;
