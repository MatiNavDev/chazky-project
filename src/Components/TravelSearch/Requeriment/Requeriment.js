import React from 'react';

const requeriment = props => {
  const { req } = props;

  const inputId = 'req-check' + req.id;

  return (
    <div>
      <input type="checkbox" id={inputId} />
      <label htmlFor={inputId}>
        <span class="fa fa-check" /> {req.description}
      </label>
    </div>
  );
};

export default requeriment;
