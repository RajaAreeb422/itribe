import LeftSideBar from "../components/LeftSideBar";
import MapComponent from "../components/Map";
//import 'mapbox-gl/dist/mapbox-gl.css';

import RightSection from "../components/RightSection";
import { useState,useEffect,useContext} from "react";
import CountriesContext from "./CountriesContext";
import { useLocation } from "react-router-dom";

const Interactivemap = () => {
  const data=useContext(CountriesContext)
  const location=useLocation()
  const [open,setOpen]=useState(false)
  const [coordinates, setCoordinates] = useState({ latitude:  34.78858921505251, longitude: 64.66559418436901 });
  //const [state, setState] = useState()
  const  handleCallback = (childData) => {
        
        setCoordinates({latitude:childData.latitude , longitude:childData.longitude});
    };

    const handleTrueSideBarChange=(childData)=>{
        console.log("show side bar",childData)
        setOpen(true)
        
    }
   
    const handleFalseSideBarChange=(childData)=>{
      console.log("show side bar",childData)
      setOpen(false)
      
  }
    useEffect(() => {
          
          if(location.state){
             setCoordinates({
              latitude:  location.state.latitude, 
              longitude: location.state.longitude
             })
          }
          console.log(data)
    
      }, [open]);

  return (
    <section className="bgblackkkk   fullscrennnn"> 
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-map-box">
                   {open &&
                  <LeftSideBar data={data} closeSideBar={handleFalseSideBarChange} parentCallback={handleCallback} open={open}/>
                   }
                  <MapComponent coordinates={coordinates} showSideBar={handleTrueSideBarChange}/>
                  
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default Interactivemap;
