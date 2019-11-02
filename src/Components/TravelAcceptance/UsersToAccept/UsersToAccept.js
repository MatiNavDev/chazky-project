import React from "react";

const usersToAccept = props => {
  const { usersToAccept, rejectUser, aceptUser } = props;
  return (
    <div>
      {usersToAccept.map(user => (
        <div key={user._id}>
          <div>{user.name}</div>
          <div>{user.travelInfo}</div>
          <button onClick={() => aceptUser(user)}>Aceptar</button>
          <button onClick={() => rejectUser(user)}>Rechazar</button>
        </div>
      ))}
    </div>
  );
};

export default usersToAccept;
