// ParentComponent.jsx
import React, { useState } from 'react';
import MapComponent from './Map';

const ParentComponent = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 37.7749, longitude: -122.4194 });

  // Function to update coordinates and trigger map fly
  const updateCoordinates = () => {
    // Update coordinates to a new location
    setCoordinates({ latitude: 40.7128, longitude: -74.0060 });
  };

  return (
    <div>
      <h1>Map Example</h1>
      {/* Render the MapComponent and pass coordinates as props */}
      <MapComponent coordinates={coordinates} />
      {/* Button to trigger a change in coordinates */}
      <button onClick={updateCoordinates}>Update Coordinates</button>
    </div>
  );
};

export default ParentComponent;