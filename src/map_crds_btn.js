// MapComponent.jsx
import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpa2lsaWNoYXJpdGEiLCJhIjoiY2prcGpwajY4MnpqMDNxbXpmcnlrbWdneCJ9.0NaE-BID7eX38MDSY40-Qg';
var map;

const MapComponent = ({ coordinates }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Create the map when the component mounts
     map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [coordinates.longitude, coordinates.latitude],
      zoom: 2,
    });

    // Add a marker
    new mapboxgl.Marker({"color": "red"}).setLngLat([coordinates.longitude, coordinates.latitude]).addTo(map);
   

    // Save the map reference to the useRef
    mapRef.current = map;

    // Cleanup on unmount
    return () => map.remove();
  }, [coordinates]);

  useEffect(() => {
    // Fly to the new coordinates when they change
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [coordinates.longitude, coordinates.latitude],
        duration: 16000, // Animate over 12 seconds
        zoom: 2,
        essential: true, // This option ensures that the flyTo completes before other animations start
      });

      // Update the marker position
      const marker = new mapboxgl.Marker().setLngLat([coordinates.longitude, coordinates.latitude]).addTo(mapRef.current);
    }
  }, [coordinates]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '85vh' }} />;
};

export default MapComponent;