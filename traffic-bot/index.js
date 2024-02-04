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
      // console.log(`Response from Simulator Server: ${data}`);
    });
  });

  req.on('error', (error) => {
    console.error(`Error making request: ${error.message}`);
  });

  req.end();
};

// And to generate regular traffic
const generateTraffic = () => {
  // Get the current time in seconds
  const currentTime = new Date().getSeconds();

  // Use a sine wave to simulate natural fluctuations
  const trafficIntensity = Math.sin((currentTime / 60) * (2 * Math.PI)) + 1;

  // Calculate the number of requests based on traffic intensity
  const randomiser = 4;
  const numberOfRequests = Math.round((trafficIntensity * randomiser) + Math.random()*randomiser); 

  // Make multiple requests to simulate traffic
  for (let i = 0; i < numberOfRequests; i++) {
    makeRequest();
  }

  //console.log(`Generated ${numberOfRequests} requests at ${currentTime} seconds.`);
};

// Make requests at regular intervals
setInterval(generateTraffic, 1000);
