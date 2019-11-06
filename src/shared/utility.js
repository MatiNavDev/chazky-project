import socketIOClient from "socket.io-client";

export const updateObject = (oldObj, updatedProp) => {
  return {
    ...oldObj,
    ...updatedProp
  };
};

export const initSocket = () => {
  const socket = socketIOClient("http://localhost:3007");
  socket.on("connect", () => console.log("client connected"));
  return socket;
};
