import { Server } from "socket.io"
import chalk from 'chalk'

const io = new Server({ /* options */ });
const portToListenOn = 3000

// this is called every time a client connects
io.on("connection", (socket) => {
  
  // setup client details
  const clientName = socket.handshake.query.clientName
  const clientColor = socket.handshake.query.clientColor
  const chalkCustomColor = chalk.hex(clientColor)

  // log how many users are connected
  console.log(io.engine.clientsCount, ' user(s) connected')
  
  // broadcast to all connected clients someone has joined
  io.emit('user:new', clientName)

  // process when a client sends a signal
  socket.on("signal", (msg) => {
    console.log(`${clientName}(${socket.id}) sent a ${chalkCustomColor('signal')}: ${msg}`)
  })

  // process when a client disconnects
  socket.on("disconnect", (reason) => {
    console.log(`${clientName}(${socket.id}) went offline`)
  })

})

// activate the server
io.listen(portToListenOn)

// log message on server console
console.log(`Server listening on port ${portToListenOn}`)