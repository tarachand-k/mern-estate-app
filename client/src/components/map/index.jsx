import { MapContainer, TileLayer } from "react-leaflet";
import "./index.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin";

function Map({ items, scrollWheelZoom = false }) {
  console.log(items);
  const position =
    items.length === 1
      ? [items[0]?.latitude, items[0]?.longitude]
      : [40.134279, -116.375684];
  return (
    <MapContainer
      className="map-container"
      center={position}
      zoom={3}
      scrollWheelZoom={scrollWheelZoom}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {items.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
    </MapContainer>
  );
}

export default Map;
