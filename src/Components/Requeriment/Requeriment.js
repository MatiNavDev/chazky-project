import React, { Fragment } from 'react';

const requeriment = props => {
  const { req } = props;

  const inputId = 'req-check' + req.id;

  return (
    <Fragment>
      <input type="checkbox" id={inputId} />
      <label htmlFor={inputId}>
        <span class="fa fa-check" /> {req.description}
      </label>
    </Fragment>
  );
};

export default requeriment;
