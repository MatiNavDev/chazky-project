import React from 'react';

const typeSelector = props => {
  const { title, elements, changed } = props;

  return (
    <label>
      {title}
      <select onChange={changed}>
        {elements.map(elem => (
          <option key={elem.id} value={elem.value}>
            {elem.description}
          </option>
        ))}
      </select>
    </label>
  );
};

export default typeSelector;
