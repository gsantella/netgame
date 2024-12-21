import { io } from "socket.io-client";


// connect to server with user connection responses
// const socket = io("http://localhost:3001")
const socket = io("http://127.0.0.1:3001")

socket.on("flag", (data) => {
  //not implemented
  console.log(data)

})

console.log(socket.active)

