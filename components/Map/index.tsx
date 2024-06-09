"use client";

import { 
  MapContainer, 
  TileLayer,
  useMap, 
  useMapEvents
} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

import s from "./style.module.scss";
import classNames from "classnames";

const MapServiceComponent: React.FC<{
  lat: number;
  lng: number;
  zoom?: number;
}> = ({ 
  lat,
  lng,
  zoom
}) => {

  const map = useMap();
  map.flyTo([lat, lng], zoom, { duration: 1 });

  return (<span></span>);
};

const MapContainerComponent: React.FC<{
  className?: string;
  lat: number;
  lng: number;
  zoom?: number;
}> = ({ 
  className,
  lat,
  lng,
  zoom = 16
}) => {

  return (
    <MapContainer
      className={classNames(className, s.mapContainer)}
      center={{ lat: 52.4789, lng: 13.4228 }}
      zoom={13}
      scrollWheelZoom={true}
      touchZoom={true}
      dragging={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapServiceComponent lat={lat} lng={lng} zoom={zoom}/>
    </MapContainer>
  );
};

export default MapContainerComponent;
