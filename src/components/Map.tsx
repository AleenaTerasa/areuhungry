import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  location: string;
}

const Map = ({ location }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 12,
      center: [77.5946, 12.9716], // Default to Bangalore
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className="p-4 border rounded-lg bg-white">
        <p className="mb-2 text-sm text-earth">Please enter your Mapbox public token to view the map:</p>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter Mapbox token"
          onChange={(e) => setMapboxToken(e.target.value)}
        />
        <p className="mt-2 text-xs text-earth-light">
          Get your token from <a href="https://mapbox.com/" className="text-honey hover:underline" target="_blank" rel="noopener noreferrer">mapbox.com</a>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-48 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;