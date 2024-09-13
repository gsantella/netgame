import { io } from "socket.io-client";
import prompts from 'prompts';

// setup questions
const connectionQuestions = [
    {
      type: 'text',
      name: 'clientName',
      message: 'What is your name?'
    },
    {
        type: 'select',
        name: 'clientColor',
        message: 'Pick colors',
        choices: [
          { title: 'Red', value: '#ff0000' },
          { title: 'Green', value: '#00ff00' },
          { title: 'Blue', value: '#0000ff' }
        ],
    }
  ];

const gameQuestions = [
    {
      type: 'text',
      name: 'message',
      message: 'What is your message?'
    }
  ];

// collect user connection questions
const connectionResponses = await prompts(connectionQuestions)

// connect to server with user connection responses
const socket = io("http://127.0.0.1:3000", {query:`clientName=${connectionResponses.clientName}&clientColor=${connectionResponses.clientColor}`})

socket.on("user:new", (clientName) => {
    //not implemented
})

const onCancel = prompt => {
    console.log('Goodbye!');
    socket.disconnect()
    process.exit(0)
}

// once connected ask questions forever until process cancelled
while (true) {

    // ask game question(s)
    const message = await prompts(gameQuestions, { onCancel });
    
    // send a signal to the server with data
    // wireshark filter: websocket.payload.text contains "signal"
    socket.emit("signal", message.message)
}



