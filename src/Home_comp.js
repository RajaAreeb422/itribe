import React from 'react';
import MapComponent from './Map';

const ParentComponent = () => {
  const initialCoordinates = [29.006, 29.7128]; // Initial coordinates (New York City)

  return (
    <div>
      <h1>Map with Marker</h1>
      <MapComponent initialCoordinates={initialCoordinates} />
    </div>
  );
};

export default ParentComponent;





