import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const BtcPriceChart = () => {
  const [chartData, setChartData] = useState(null);

useEffect(() => {
    // Get the date a year ago in UNIX timestamp
    const specificDate = Math.floor((Date.now() - 365 * 24 * 60 * 60 * 1000) / 1000);
    const today = Math.floor(Date.now() / 1000);

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${specificDate}&to=${today}`
      )
      .then((res) => {
        let weeklyBtcTime = [];
        let weeklyBtcPrice = [];

        for(let i = 0; i < res.data.prices.length; i += 7){
          weeklyBtcTime.push(new Date(res.data.prices[i][0]).toLocaleDateString());
          weeklyBtcPrice.push(res.data.prices[i][1]);
        }
        
        setChartData({
          labels: weeklyBtcTime,
          datasets: [{
            label: 'BTC Price',
            data: weeklyBtcPrice,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: 'rgba(75, 192, 192, 1)',
          }]
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const style = {
    maxWidth: '600px',
    height: '400px',
  };

  return (
    <div>
        <h1>BTC Price Chart</h1>
        <div  style={style}>
        <Line data={chartData} options={options}/>

        </div>
    </div>
  );
};

export default BtcPriceChart;
