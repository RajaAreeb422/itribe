// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import MapboxGeocoder from "mapbox-gl-geocoder";
// //import 'mapbox-gl/dist/mapbox-gl.css'
// //import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiYWxpa2lsaWNoYXJpdGEiLCJhIjoiY2prcGpwajY4MnpqMDNxbXpmcnlrbWdneCJ9.0NaE-BID7eX38MDSY40-Qg";

// export default function Vercelmap(props) {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(0);
//   const [lat, setLat] = useState(0);
//   const [zoom, setZoom] = useState(1);

//   useEffect(() => {
    
//     let myLng=0,myLat=0;
//     if(props && props.values){
      
//       myLng=props.values.lan;
//       myLat=props.values.lat
//       console.log("myLng",myLng)
//       setLng(props.values.lan)
//       setLat(props.values.lat)
//     }
    
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/satellite-streets-v12",
//       center: [myLng, myLat],
//       zoom: zoom,
//       maxBounds: [-180, -90, 180, 90],
//     });

//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl,
//     });
//   });

//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12">
//             <div
//               ref={mapContainer}
//               className="map-container"
//               style={{ height: "110vh", width: "100%" }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpa2lsaWNoYXJpdGEiLCJhIjoiY2prcGpwajY4MnpqMDNxbXpmcnlrbWdneCJ9.0NaE-BID7eX38MDSY40-Qg';
var map;

const MapTestComponent = ({ coordinates }) => {
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
    new mapboxgl.Marker().setLngLat([coordinates.longitude, coordinates.latitude]).addTo(map);

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

export default MapTestComponent;