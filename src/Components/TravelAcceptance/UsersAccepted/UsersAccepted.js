import React from 'react';

const usersAccepted = props => {
  const { usersAccepted } = props;
  return (
    <div>
      {usersAccepted.map(user => (
        <div key={user.id}>
          <div>{user.userName}</div>
          <div>{user.travelInfo}</div>
        </div>
      ))}
    </div>
  );
};

export default usersAccepted;
