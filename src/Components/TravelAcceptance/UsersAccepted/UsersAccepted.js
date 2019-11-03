import React from "react";

const usersAccepted = props => {
  const { usersAccepted } = props;
  return (
    <div>
      <div>Usuarios Aceptados</div>
      <div>
        {usersAccepted.map(user => (
          <div key={user._id}>
            <div>{user.name}</div>
            <div>{user.travelInfo}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default usersAccepted;
