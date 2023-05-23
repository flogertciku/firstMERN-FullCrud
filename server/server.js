const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const app = express();
           
app.use(cors());
app.use(express.json());                           /* This is new and allows JSON Objects to be posted */
app.use(express.urlencoded({ extended: true }));   /* This is new and allows JSON Objects with strings and arrays*/
require('./config/mongoose.config');    /* This is new */
routes = require('./routes/person.routes')

routes(app);
const server = app.listen(8000, () => {
    console.log("Listening at Port 8000")
})



    const io = socket(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            allowedHeaders: ['*'],
            credentials: true,
        }
    })
   
    io.on('connection', (socket) => {
      // ketu nis lidhja e streamit
      console.log('New client connected');
      socket.on("toServer", data => {
        // send a message with "data" to ALL clients EXCEPT for the one that emitted the
    	//     "event_from_client" event
        console.log("ne server therritet  toServer");
        io.emit("toClient", data);
    });
  
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  
  


// io.on('connection', (socket) => {
//     console.log('New client connected');
//     socket.emit('itemList', itemList);
  
//     // Rest of the event handlers...
//   });
