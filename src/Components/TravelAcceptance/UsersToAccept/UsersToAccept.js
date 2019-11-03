import React from "react";

const usersToAccept = props => {
  const { usersToAccept, rejectUser, acceptUser } = props;
  return (
    <div>
      <div>Usuarios a Aceptar o Rechazar</div>
      <div>
        {usersToAccept.map(user => (
          <div key={user._id}>
            <div>{user.name}</div>
            <div>{user.travelInfo}</div>
            <button onClick={() => acceptUser(user)}>Aceptar</button>
            <button onClick={() => rejectUser(user)}>Rechazar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default usersToAccept;
