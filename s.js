import { Server } from "socket.io"

const io = new Server({ /* options */ });
const portToListenOn = 3001

// this is called every time a client connects
io.on("connection", (socket) => {
  
  io.emit('flag', 'shsbt{x8x8x8x8x8x8x8x8x8}')
  
})

// activate the server
io.listen(portToListenOn)

// log message on server console
console.log(`Server listening on port ${portToListenOn}`)