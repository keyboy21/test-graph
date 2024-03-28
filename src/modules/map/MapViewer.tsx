import Graphics from "@arcgis/core/Graphic";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import Picture from "@arcgis/core/symbols/PictureMarkerSymbol";
import MapView from "@arcgis/core/views/MapView";
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { cn } from '~/libs/cn.lib';

export const MapViewer: FC<MapViewerProps> = ({ className }) => {
  const mapRef = useRef(null);

  esriConfig.apiKey = 'AAPK17b593d0a75d45aebdba742fca6fc6a3q0J6AwC-C1D4CD375UaxHVGUDyloE3lTE8aFFR0Ha6niBKhL_8Qjfaqj5xN1yg1b'

  const point = {
    type: 'point',
    longitude: 69.336241,
    latitude: 41.342260
  };

  const popupTemplate = {
    title: "Работа: Министерство цифровых технологий",
  }

  useEffect(() => {
    if (mapRef.current) {

      // WebMap instance
      const webmap = new WebMap({
        basemap: "arcgis-navigation"
      });

      // MapView displays the webmap
      const view = new MapView({
        container: mapRef.current,
        map: webmap,
        center: [
          69.336241,
          41.342260
        ],
        zoom: 13
      });

      // Marker symbol
      const simpleMarkerSymbol = new Picture({
        // job icon
        url: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png",
        width: "30px",
        height: "30px"
      });

      // Marker graphic
      const markerGraphic = new Graphics({
        // @ts-ignore: Unreachable code error
        geometry: point,
        symbol: simpleMarkerSymbol,
        popupTemplate,
      });

      view.graphics.add(markerGraphic);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, [mapRef]);

  return <div ref={mapRef} className={cn('w-full h-[600px]', className)} />;
};

interface MapViewerProps {
  className?: string;
}
