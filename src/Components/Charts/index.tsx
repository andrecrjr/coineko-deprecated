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

function Sparkline({
	datasetSpark,
	color
}: {
	datasetSpark: number[];
	color: string;
}) {
	return (
		<Line
			width={'120'}
			height={'50'}
			options={{
				scales: { x: { display: false }, y: { display: false } },
				responsive: false,
				elements: {
					line: {
						borderColor: `${color || '#9472d4'}`,
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
				datasets: [{ data: datasetSpark, borderWidth: 0.8 }]
			}}
		/>
	);
}

export default Sparkline;
