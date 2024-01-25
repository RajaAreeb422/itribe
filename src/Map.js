



import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpa2lsaWNoYXJpdGEiLCJhIjoiY2prcGpwajY4MnpqMDNxbXpmcnlrbWdneCJ9.0NaE-BID7eX38MDSY40-Qg';
var map;
const MapComponent = ({ initialCoordinates }) => {
  const mapContainer = useRef(null);
  const [marker, setMarker] = useState(null);

 

  const handleButtonClick = () => {
    // Example coordinates (replace with your logic for obtaining coordinates)
    const newCoordinates = [-73.9814, 40.7488]; // Example coordinates (New York City)

    addMarker(newCoordinates);
  };

  useEffect(() => {
      map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: initialCoordinates || [-55.006, 20.7128], // Default or initial coordinates
      zoom: 2,
    });

    // Cleanup when the component is unmounted
    return () => map.remove();
  }, [initialCoordinates]);

  const addMarker = (coordinates) => {
    if (marker) {
      marker.remove(); // Remove existing marker
    }
    map.flyTo({
      center: coordinates,
      duration: 8000, // Animate over 12 seconds
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
    // Add a new marker to the map
    const newMarker = new mapboxgl.Marker({"color": "red"}).setLngLat(coordinates).addTo(map);

    // Update the marker state
    setMarker(newMarker);
  };

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '85vh' }} />
      <button onClick={handleButtonClick}>Apply Filter</button>
    </div>
  );
};

export default MapComponent;

