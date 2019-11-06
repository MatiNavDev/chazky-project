import React from "react";

const typeSelector = props => {
  const { title, elements, changed, type, elemChoosed } = props;
  return (
    <label>
      {title}
      <select
        defaultValue={elemChoosed}
        onChange={event => changed(event, type)}
      >
        {elements.map(elem => (
          <option key={elem._id} value={elem._id}>
            {elem.location
              ? `${elem.name} (lat: ${elem.location.coordinates[1]}, long: ${
                  elem.location.coordinates[0]
                })`
              : elem.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default typeSelector;
