// import MapComponent from "./Map";
// //import Vercelmap from "./Map";
// import { useEffect,useState } from "react";
// const RightSection = (props) => {
  
//   const [coordinates, setCoordinates] = useState({ latitude: 37.7749, longitude: -122.4194 });

//   // Function to update coordinates and trigger map fly
//   const updateCoordinates = () => {
//     // Update coordinates to a new location
//     setCoordinates({ latitude: 40.7128, longitude: -74.0060 });
//   };


//   useEffect(() => {
    
//     console.log("useEffect start",props)
//     if(props){
//       console.log("right sectrion props",props)
//       setCoordinates(props.values)
//     }

//   }, []);
//   return (
//     <div>
//       <section className="rightssss">
//         <div className="container-fluid ">
//           <div className="row">
//             <div className="col-lg-12">
//             {/* <MapComponent coordinates={coordinates} /> */}
//           {/* <Vercelmap values={props.values} /> */}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default RightSection;


import MapComponent from './Map';
import { useState } from 'react';

const RightSection = () => {
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

export default RightSection;