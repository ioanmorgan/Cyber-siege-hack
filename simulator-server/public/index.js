/**
 *  Configurables
 */
const maxDataPoints = 100;   // Maximum data points to store & display
const monteCarloSampleSize = 25; // Size of the sample that the simulator should use


// Global data
const connectionData = []; // Raw data from the server
const successData = []; // Data to be passed to the chart
const failureData = []; // Data to be passed to the chart


import { runMonteCarloSimulation } from './monteCarloExample.mjs';
import { updateChartData } from './chart.mjs';


/**
 * Set up the socket & have it update the simulator and charts
 */ 
const socket = io('http://localhost:3000');
socket.on('connectionCounts', (data) => {
  connectionData.push(data);
  successData.push(data.successfulConnections);
  failureData.push(data.failedConnections);

  // Trim data thats beyond the limit
  if (successData.length > maxDataPoints) {
    connectionData.shift();
    successData.shift();
    failureData.shift();
  }

  updateChartData(successData, failureData);
  runMonteCarloSimulation(connectionData, monteCarloSampleSize);
});
