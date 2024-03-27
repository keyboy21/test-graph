import { LineChart } from '@tremor/react';
import type { FC } from 'react';
import { Heading } from '~/components/typography/Heading';
import { Text } from '~/components/typography/Text';
import { Container } from '~/components/ui/Container';
import { asceding } from '~/data/ascending';
import { descading } from '~/data/descading';
import { time } from '~/libs/time.lib'

export const HomeModule: FC = () => {
	// we need to calculate the average of each date by point in the data
	// every key is a date and the value is a number of the data
	const calculateAverage = (asceding: DataStructure[], descading: DataStructure[]): LineChartData[] => {
		const result: LineChartData[] = [];
		const averageOfAsceding: DataStructure = asceding.reduce((acc, item) => {
			Object.keys(item).forEach((key) => {
				acc[key] = acc[key] + item[key] / asceding.length;
			});
			return acc;
		});
		const averageOfDescading: DataStructure = descading.reduce((acc, item) => {
			Object.keys(item).forEach((key) => {
				acc[key] = acc[key] + item[key] / descading.length;
			});
			return acc;
		});

		// we need to merge the two objects and return the result
		// but dates in the asceding and descading are not the same
		// so we need to merge them by date and return the result
		// if the date is not in the asceding or descading we need to return 0 by default
		const allDates = [...Object.keys(averageOfAsceding), ...Object.keys(averageOfDescading)];
		const uniqueDates = Array.from(new Set(allDates));
		uniqueDates.sort((a, b) => time(a).isBefore(time(b)) ? -1 : 1);

		uniqueDates.forEach((date) => {
			result.push({
				date: time(date).format('DD.MM.YYYY'),
				asceding: averageOfAsceding[date] || 0,
				descading: averageOfDescading[date] || 0,
			});
		});

		return result;
	}

	const data = calculateAverage(asceding, descading);

	return (
		<section className="py-10">
			<Container className="space-y-5">
				<Heading className="text-center" level={1} as="h1">
					Главная страница
				</Heading>
				<Text className='text-pretty text-center text-lg'>
					На этой странице вы можете увидеть график среднего значения данных за каждый день.
					Если в какой-то из дней отсутствует значение, то оно будет равно 0.
				</Text>
				<div className="flex w-3/4 mx-auto gap-5">
					<LineChart
						className="h-80"
						data={data}
						index="date"
						categories={['asceding', 'descading']}
						colors={['indigo', 'red']}
						yAxisWidth={50}
					/>
				</div>
			</Container>
		</section>
	);
};

interface LineChartData {
	date: string;
	asceding: number;
	descading: number;
}

interface DataStructure {
	[date: string]: number;
}
