import { Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  } from "chart.js";
  
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  )

export default function PriceChart() {

    const data = {
        labels : ["Mon", "Tue", "Wed"],
        datasets : [{
            labels: "Sales of the Week",
            data: [100, 200, 300],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "rgba(255, 99, 132, 1)",
        }]
    }

    const options = {
        plugins: {
            legend:true
        },
        scales: {
            y: {
                min:0,
                max:400
            }
        }
    }
  return (
    <div><Line data={data} options={options}></Line></div>
  )
}
