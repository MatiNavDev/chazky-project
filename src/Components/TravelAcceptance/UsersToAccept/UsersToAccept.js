import React from 'react';

const usersToAccept = props => {
  const { usersToAccept, rejectUser, aceptUser } = props;

  return (
    <div>
      {usersToAccept.map(user => (
        <div key={user.id}>
          <div>{user.userName}</div>
          <div>{user.travelInfo}</div>
          <button onClick={() => aceptUser(user)}>Aceptar</button>
          <button onClick={() => rejectUser(user)}>Rechazar</button>
        </div>
      ))}
    </div>
  );
};

export default usersToAccept;
