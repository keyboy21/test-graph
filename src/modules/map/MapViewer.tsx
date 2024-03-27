import { useRef, useEffect } from 'react';
import Expand from '@arcgis/core/widgets/Expand';
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import Graphics from "@arcgis/core/Graphic";
import Picture from "@arcgis/core/symbols/PictureMarkerSymbol";

export const MapViewer = () => {
  const mapRef = useRef(null);

  esriConfig.apiKey = 'AAPK17b593d0a75d45aebdba742fca6fc6a3q0J6AwC-C1D4CD375UaxHVGUDyloE3lTE8aFFR0Ha6niBKhL_8Qjfaqj5xN1yg1b'

  const point = {
    type: "point",
    longitude: 69.336241,
    latitude: 41.342260
  };

  const popupTemplate = {
    title: "Работа: Министерство цифровых технологий",
  }

  useEffect(() => {
    if (mapRef.current) {

      const webmap = new WebMap({
        basemap: "arcgis-navigation"
      });

      const view = new MapView({
        container: mapRef.current,
        map: webmap,
        center: [
          69.336241,
          41.342260,
        ],
        zoom: 13
      });

      const simpleMarkerSymbol = new Picture({
        // job icon
        url: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png",
        width: "30px",
        height: "30px"
      });

      const bkExpand = new Expand({ view, content: mapRef.current });

      const markerGraphic = new Graphics({
        geometry: point,
        symbol: simpleMarkerSymbol,
        popupTemplate,
      });

      view.graphics.add(markerGraphic);
      view.ui.add(bkExpand, "top-right");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, [mapRef]);

  return <div ref={mapRef} style={{ height: '100vh', width: '70%' }} />;
};
