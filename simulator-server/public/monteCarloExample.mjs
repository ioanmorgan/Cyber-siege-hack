/**
 * Monte Carlo simulation example
 */
export const runMonteCarloSimulation = (connectionData, sampleSize) => {

  // Ensure the dataset has enough data points
  if (connectionData.length < sampleSize) {
    console.info('Insufficient data points for simulation.');
    return;
  }

  // Randomly sample points from the dataset
  const sample = getRandomSample(connectionData, sampleSize);

  // Calculate the average failure rate in the sample
  const averageFailureRate = calculateAverageFailureRate(sample);

  // Update the HTML with the result
  const probabilityElement = document.getElementById('probability');
  probabilityElement.textContent = `${(averageFailureRate * 100).toFixed(0)}%`;
};

// Function to randomly sample points from an array
const getRandomSample = (array, size) => {
  const sample = [];
  const indices = [];

  while (indices.length < size) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
      sample.push(array[randomIndex]);
    }
  }

  return sample;
}

// Function to calculate the average failure rate in a sample
const calculateAverageFailureRate = (sample) => {
  
  const totalSuccessCount = sample.reduce((sum, point) => sum + point.successfulConnections, 0);
  const totalFailureCount = sample.reduce((sum, point) => sum + point.failedConnections, 0);
  
  if (totalSuccessCount + totalFailureCount === 0) {
    // Handle the case where both success and failure counts are zero
    return 0;
  }

  // Calculate the average failure rate
  const averageFailureRate = totalFailureCount / (totalSuccessCount + totalFailureCount);

  return averageFailureRate;
};
