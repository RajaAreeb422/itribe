import React from 'react';
import MapTestComponent from '../components/MapTest.jsx';

const MapTestPage = () => {
  const initialCoordinates = [29.006, 29.6128]; // Initial coordinates (New York City)

  return (
    <div>
      <h1>Map with Marker</h1>
      <MapTestComponent initialCoordinates={initialCoordinates} />
    </div>
  );
};

export default MapTestPage;