import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const PrsMap = () => {
  const center = [27.7172, 85.3240];

  return (
    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot; target=&quot;_blank&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={center} />
    </MapContainer>
  );
};

export default PrsMap;
