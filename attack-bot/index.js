const http = require('http');

// Use the hostname 'simulator-server' to resolve to the container's IP
const simulatorServerHost = 'simulator-server';
const simulatorServerPort = 3000;

// To make a single, simple request
const makeRequest = () => {
  const options = {
    hostname: simulatorServerHost,
    port: simulatorServerPort,
    path: '/attack-me',
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`Response from Simulator Server: ${data}`);
    });
  });

  req.on('error', (error) => {
    console.error(`Error making request: ${error.message}`);
  });

  req.end();
};


// Make requests at regular intervals
setInterval(makeRequest, 1000);
