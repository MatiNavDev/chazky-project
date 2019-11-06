import socketIOClient from "socket.io-client";

export const updateObject = (oldObj, updatedProp) => {
  return {
    ...oldObj,
    ...updatedProp
  };
};

export const initSocket = () => {
  const socket = socketIOClient("https://chasky-app-server.herokuapp.com");
  socket.on("connect", () => console.log("client connected"));
  return socket;
};
