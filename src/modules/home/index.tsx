import type { FC } from 'react';
import { Heading } from '~/components/typography/Heading';
import { Container } from '~/components/ui/Container';

export const HomeModule: FC = () => {
	return (
		<section className="py-10">
			<Container className="space-y-5">
				<Heading className="text-center" level={1} as="h1">
					Главная страница
				</Heading>
				<div className="flex w-fit mx-auto gap-5">
				</div>
			</Container>
		</section>
	);
};
