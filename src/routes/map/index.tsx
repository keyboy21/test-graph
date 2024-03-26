import { createFileRoute } from '@tanstack/react-router';
import { MapModule } from '~/modules/map';

const MapPage = () => {
	return <MapModule />;
};

export const Route = createFileRoute('/map/')({
	component: MapPage,
});
