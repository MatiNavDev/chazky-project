import React from "react";

const requeriment = props => {
  const { req, add, remove } = props;

  const inputId = "req-check" + req.id;

  const handleChange = event => {
    if (event.target.checked) {
      add(req._id);
    } else {
      remove(req._id);
    }
  };

  return (
    <div>
      <input
        onChange={event => handleChange(event)}
        type="checkbox"
        id={inputId}
      />
      <label htmlFor={inputId}>
        <span className="fa fa-check" /> {req.description}
      </label>
    </div>
  );
};

export default requeriment;
