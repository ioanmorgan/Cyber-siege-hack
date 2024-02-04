const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let successfulCount = 0;
let failureCount = 0;


// Serve the Connections Dashboard (index.html) on `/`
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * And the socket code to power the Dashboard
 */
setInterval(() => {
  io.emit('connectionCounts', { successfulConnections: successfulCount, failedConnections: failureCount  });
}, 500);

io.on('connection', (socket) => {
  // Send initial connection count to new clients
  socket.emit('connectionCounts', { successful: successfulCount, failures: failureCount  });
});

/**
 * This is the simulation endpoint, it will hold a connection open for a short period
 * to mimic it doing something complex.  The sort of endpoint which is
 * perfect to attack!
 */
let outage = false;
app.get('/attack-me', (req, res) => {

  // Calculate the probability of failure based on the number of connections
  const baseProbability = 0.01; // Base probability of failure
  const maxConnections = 100; // Change to adjust sensativity
  const failureProbability = baseProbability + (successfulCount / maxConnections);

  // Simulate occasional connection issues / stress
  if (outage === true || Math.random() < failureProbability) {
    res.status(500).send('Internal Server Error');
    failureCount++;
    setTimeout(() => { failureCount--; }, 1000); // Just clear it after a second...not sexy, but simple
    return;
  }

  // Simulate an outage
  if(failureCount > successfulCount ){
    outage = true;
    console.log('OUTAGE!');
    setTimeout(
      () => { 
        console.log('System recovered!');
        outage = false; 
      }, 
      Math.random()*1000
    )
  }

  // Increase successful connection count when a new connection is made...assuming it didnt die
  successfulCount++;

  // Hold the connection open for a random duration (up to 5 seconds)
  const holdDuration = Math.random() * 5000;
  setTimeout(() => {
    // Decrease count when the connection is closed
    successfulCount--;
    
    res.send('Hello world! This request took ' + Math.round(holdDuration)/1000 + ' seconds');
  }, holdDuration);
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Simulator Server listening on port ${PORT}`);
});
