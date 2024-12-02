import { useQuery } from 'react-query';
import { fetchCoinHistory } from 'src/api';
import ApexCharts from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from 'src/atoms';

interface IHistoricalData {
	time_open: number;
	time_close: number;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	market_cap: number;
}

interface ChartProps {
	coinId: string;
}

function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<IHistoricalData[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId), {
		refetchInterval: 5000
	});

	const isDark = useRecoilValue(isDarkAtom);
	return (
		<div>
			{isLoading ? (
				'Loading chart ...'
			) : (
				<ApexCharts
					type="line"
					series={[
						{
							name: 'Price',
							data: data?.map((price) => Number(price.close)) ?? []
						}
					]}
					options={{
						theme: {
							mode: isDark ? 'dark' : 'light'
						},
						chart: {
							height: 300,
							width: 500,
							toolbar: {
								show: false
							},
							background: 'transparent'
						},
						grid: {
							show: false
						},
						stroke: {
							curve: 'smooth',
							width: 4
						},
						yaxis: {
							show: false
						},
						xaxis: {
							axisBorder: {
								show: false
							},
							axisTicks: {
								show: false
							},
							labels: {
								show: false
							},
							// type: 'datetime',
							categories: data?.map((price) => {
								const timestamp = price.time_close;
								const date = new Date(timestamp * 1000);
								// return date.toLocaleString();
								return `${price.time_close} + k`;
							})
						},
						fill: { type: 'gradient', gradient: { gradientToColors: ['#0be881'], stops: [0, 100] } },
						colors: ['#0fbcf9'],
						tooltip: {
							y: {
								formatter: (value) => `$ ${value.toFixed(2)} USD`
							}
						}
					}}
				/>
			)}
		</div>
	);
}
export default Chart;
