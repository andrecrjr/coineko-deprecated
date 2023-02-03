import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip
);

function Sparkline({ datasetSpark }: { datasetSpark: number[] }) {
	return (
		<Line
			width={'120'}
			height={'50'}
			options={{
				scales: { x: { display: false }, y: { display: false } },
				responsive: false,
				elements: {
					line: {
						borderColor: '#6769AD',
						borderWidth: 1
					},
					point: {
						radius: 0
					}
				},
				plugins: {
					tooltip: {
						enabled: false
					}
				}
			}}
			data={{
				labels: datasetSpark.map((item) => item),
				datasets: [{ data: datasetSpark, borderWidth: 1 }]
			}}
		/>
	);
}

export default Sparkline;
