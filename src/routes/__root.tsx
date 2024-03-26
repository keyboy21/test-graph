import { BarChart4, Map as MapIcon } from 'lucide-react';
import { Outlet, Link, createRootRoute } from '@tanstack/react-router';
import { Container } from '~/components/ui/Container';
import { cn } from '~/libs/cn.lib';

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: () => {
		return <p>Not Found (on root route)</p>;
	},
});

function RootComponent() {
	return (
		<>
			<header className="sticky top-0 z-10 border-b bg-white py-4">
				<Container className="flex items-center justify-center gap-10">
					<Link
						to={'/'}
						className={cn('flex flex-row items-center gap-x-2 p-3')}
						activeProps={{ className: 'text-blue-600 shadow-md rounded-md' }}
					>
						<BarChart4 className="h-7 w-7" />
						<span className="hidden font-bold sm:inline-block">Главная</span>
					</Link>
					<Link
						to={'/map'}
						className={cn('flex flex-row items-center gap-x-2 p-3')}
						activeProps={{ className: 'text-red-600 shadow-md rounded-md' }}
					>
						<MapIcon className="h-7 w-7" />
						<span className={'hidden font-bold sm:inline-block'}>
							Карта
						</span>
					</Link>
				</Container>
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
}
