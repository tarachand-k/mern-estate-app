import { MapContainer, TileLayer } from "react-leaflet";
import "./index.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin";

function Map({ items, scrollWheelZoom = false }) {
  const position = [items[0]?.latitude, items[0]?.longitude];
  return (
    <MapContainer
      className="map-container"
      center={position}
      zoom={7}
      scrollWheelZoom={scrollWheelZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
    </MapContainer>
  );
}

export default Map;
