

const ctxCombined = document.getElementById('combinedChart').getContext('2d');
const combinedChart = new Chart(ctxCombined, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Successful connections',
        data: [],
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Failed connections',
        data: [],
        borderColor: 'red',
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    animation: {
      duration: 0,
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        //min: -maxDataPoints + 1,
        max: 0,
        stepSize: 1,
        beginAtZero: true,
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  },
});

export const updateChartData = (successData, failureData) => {
  if(successData.length < 1) return;  // Dont do anything if we have no data
  combinedChart.data.labels = Array.from({ length: successData.length }, (_, i) => `-${successData.length - i - 1}`);
  combinedChart.data.datasets[0].data = successData;
  combinedChart.data.datasets[1].data = failureData;

  // Update the chart
  combinedChart.update();
};
