import React from "react";

const typeSelector = props => {
  const { title, elements, changed } = props;

  return (
    <label>
      {title}
      <select onChange={changed}>
        {elements.map(elem => (
          <option key={elem._id} value={elem.value}>
            {elem.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default typeSelector;
