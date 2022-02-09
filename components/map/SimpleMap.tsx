import React from 'react';
import GoogleMapReact from 'google-map-react';

export default function SimpleMap({ lat, lng }: { lat: number; lng: number }) {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        center={{ lat, lng }}
        defaultZoom={8}
      ></GoogleMapReact>
    </div>
  );
}
