import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { GiHamburgerMenu } from "react-icons/gi";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpa2lsaWNoYXJpdGEiLCJhIjoiY2prcGpwajY4MnpqMDNxbXpmcnlrbWdneCJ9.0NaE-BID7eX38MDSY40-Qg';
var map;
var marker_popup =new mapboxgl.Popup({ offset: 25, closeOnClick: false, closeButton: true}).setHTML(
  '<div style="min-width: 220px;"></div><table class="table table-striped" style="font-size: 10px;"><thead><tr><th colspan="2" style="text-align:center;">Village Details</th></tr></thead><tbody><tr><td>Country Name:</td><td>Afghanistan</td></tr><tr><td>Village Name:</td><td>Dahani Durum Burjak</td></tr><tr><td>Population:</td><td>26916</td></tr><tr><td>Village Area:</td><td> 7146.268027 Sq.Mt</td></tr><tr><td>Community Leader:</td><td> Haji Khan</td></tr></tbody></table> <a href="https://tripp3-labs.vercel.app/register" class="btn btn-danger btn-sm" style="margin-left: 5%; display: inline;">Register with this village</a></div>'
  // 'No Data Found'
);
var statuscounter=1;
var cluster_point_popup='';
var cluster_point_popup_large='';
var mainmarker;
var center_coords;

const MapComponent = ({ coordinates ,showSideBar}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);


  useEffect(() => {
    if(statuscounter<4){
     center_coords=[-4.54892798294938, 24.095440271917];
    }else{
      center_coords=[coordinates.longitude, coordinates.latitude];
    }
   
    console.log("first useeffect",coordinates)
    // Create the map when the component mounts
     map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // style: 'mapbox://styles/mapbox/satellite-streets-v12',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center_coords,
      zoom: 1,
    });



    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Search Any Location...',
    });

    // Create a container for the geocoder and set its position
    const geocoderContainer = document.createElement('div');
    geocoderContainer.style.position = 'absolute';
    geocoderContainer.style.top = '10px'; // Adjust as needed
    geocoderContainer.style.left = '4px'; // Adjust as needed
    // Append the geocoder to the container
    geocoderContainer.appendChild(geocoder.onAdd(map));
    // Append the container to the map
    map.getContainer().appendChild(geocoderContainer);

  

    const fetchData = async () => {
      try {
        const apiUrl = 'https://tripp33-backend.vercel.app/tripp3_labs-api/villages/byCoordinates';

        const requestData = {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        };
        const response = await axios.post(apiUrl, requestData);
        console.log('API Response:', response.data);
        // console.log(response.data.data[0].village_name);
        var resdata=response.data.data[0]
        marker_popup.setHTML(
          '<div style="min-width: 220px;"><table class="table table-striped" style="font-size: 10px;"><thead><tr><th colspan="2" style="text-align:center;">Village Details</th></tr></thead><tbody><tr><td>Country Name:</td><td>'+resdata.country_name+'</td></tr><tr><td>Village Name:</td><td>'+resdata.village_name+'</td></tr><tr><td>Population:</td><td>'+resdata.population+'</td></tr><tr><td>Village Area:</td><td> '+resdata.area_square_meter+' Sq.Mt</td></tr><tr><td>Community Leader:</td><td> Haji Khan</td></tr></tbody></table> <a href="https://tripp3-labs.vercel.app/register" class="btn btn-danger btn-sm" style="margin-left: 5%; display: inline;">Register with this village</a></div>'
        );
        mainmarker.togglePopup();
        // Process the response data as needed
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors
      }
    };
    fetchData();

    
    // axios.get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/getUserStatusByLocation/20`)
    // .then((res) => {
    //   marker_popup=new mapboxgl.Popup({ offset: 25, closeOnClick: false, closeButton: true}).setText(
    //     'Number of All Registered villages: '+ res.data.data.countryCount
    //   );
    //   console.log(res.data.data.countryCount);
    // })
    // .catch((err) => {
    //   marker_popup=new mapboxgl.Popup({ offset: 25, closeOnClick: false, closeButton: true}).setText(
    //     'Error retriving Data'
    //   );
    //   console.log(err)
    // });
    // // create the popup
    // const popup = new mapboxgl.Popup({ offset: 25 }).setText(
    // 'popup data: '+popval
    // );
    
    // Add a marker
    // const marker = new mapboxgl.Marker({"color": "red"}).setLngLat([coordinates.longitude, coordinates.latitude]).addTo(map);
      mainmarker = new mapboxgl.Marker({"color": "red"})
    .setLngLat([coordinates.longitude, coordinates.latitude])
    .setPopup(marker_popup) // sets a popup on this marker
    .addTo(map)
    // marker.togglePopup();
    // setTimeout(() => {
    //   marker.togglePopup();
    // }, 1500);
    
    // .togglePopup();
    // if(statuscounter==2){
    //   console.log('statuscounter='+statuscounter);
    //   marker.remove();
    // }
    statuscounter++
    // Save the map reference to the useRef
    mapRef.current = map;

    // Cleanup on unmount
    // return () => map.remove();

    // if(statuscounter!=2){
      axios.get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/`)
      .then((res) => {
        
        var inputData=res.data.data;

        const village_geojson = {
          type: "FeatureCollection",
          features: inputData.map(point => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [point.longitude, point.latitude]
            },
            properties: {
              
              id: point.village_id,
              country_name: point.country_name,
              village_name: point.village_name,
              population: point.population,
              area_square_meter: point.area_square_meter,
              
            }
          }))
        };
      
        

          // Add a new source from our GeoJSON data and
          // set the 'cluster' option to true. GL-JS will
          // add the point_count property to your source data.
        
          map.addSource('villages_', {
          type: 'geojson',
          // Point to GeoJSON data. This example visualizes all M1.0+ villages_
          // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
          // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/villages_.geojson',
          // data: supercluster.getClusters([-180, -90, 180, 90], map.getZoom()),
          data: village_geojson,
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
          });
          
          map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'villages_',
          filter: ['has', 'point_count'],
          paint: {
          // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          950,
          '#f28cb1'
          ],
          'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          950,
          40
          ]
          }
          });

          // ...........heatmap layer...........
          // map.addLayer({
          //   id: 'heatmap-layer',
          //   type: 'heatmap',
          //   source: 'villages_',
          //   paint: {
          //     'heatmap-weight': {
          //       property: 'point_count',
          //       type: 'identity',
          //     },
          //     'heatmap-intensity': 1.5,
          //     'heatmap-color': [
          //       'interpolate',
          //       ['linear'],
          //       ['heatmap-density'],
          //       0, 'rgba(255, 255, 255, 0)',
          //       0.2, 'rgba(255, 255, 255, 0.5)',
          //       0.4, 'rgba(255, 255, 255, 0.8)',
          //       0.6, 'rgba(255, 255, 0, 1)',
          //       0.8, 'rgba(255, 0, 0, 1)',
          //     ],
          //     'heatmap-radius': 30,
          //     'heatmap-opacity': 0.8,
          //   },
          // });
          
          map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'villages_',
          filter: ['has', 'point_count'],
          layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
          }
          });
          
          map.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'villages_',
          filter: ['!', ['has', 'point_count']],
          paint: {
          'circle-color': 'red',
          'circle-radius': 7,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
          }
          });
          
          // inspect a cluster on click
          map.on('click', 'clusters', (e) => {
          const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
          });
          const clusterId = features[0].properties.cluster_id;
          map.getSource('villages_').getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
          if (err) return;
          
          map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom
          });
          }
          );
          });
          
          // When a click event occurs on a feature in
          // the unclustered-point layer, open a popup at
          // the location of the feature, with
          // description HTML from its properties.
          map.on('click', 'unclustered-point', (e) => {
            console.log(e);
            if(cluster_point_popup_large !=''){
              cluster_point_popup_large.remove();
            }
            if(cluster_point_popup_large ==''){
              marker_popup.remove();
            }
            
              
            
          const coordinates = e.features[0].geometry.coordinates.slice();
          // const village_name = e.features[0].properties.label;
          var resdata=e.features[0].properties;
          console.log(resdata.village_name);
          
          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          
          cluster_point_popup_large =new mapboxgl.Popup({ offset: 25, closeOnClick: false, closeButton: true})
          .setLngLat(coordinates)
          .setHTML(
            '<div style="min-width: 220px;"><table class="table table-striped" style="font-size: 10px;"><thead><tr><th colspan="2" style="text-align:center;">Village Details</th></tr></thead><tbody><tr><td>Country Name:</td><td>'+resdata.country_name+'</td></tr><tr><td>Village Name:</td><td>'+resdata.village_name+'</td></tr><tr><td>Population:</td><td>'+resdata.population+'</td></tr><tr><td>Village Area:</td><td> '+resdata.area_square_meter+' Sq.Mt</td></tr><tr><td>Community Leader:</td><td> Haji Khan</td></tr></tbody></table> <a href="https://tripp3-labs.vercel.app/register" class="btn btn-danger btn-sm" style="margin-left: 5%; display: inline;">Register with this village</a></div>'
            // 'No Data Found'
          ).addTo(map);

          // new mapboxgl.Popup()
          // .setLngLat(coordinates)
          // .setHTML(
          //   '<table class="table table-striped" style="font-size: 10px;"><thead><tr><th colspan="2" style="text-align:center;">Village Details</th></tr></thead><tbody><tr><td>Country Name:</td><td>Afghanistan</td></tr><tr><td>Village Name:</td><td>any</td></tr><tr><td>Population:</td><td>4703</td></tr><tr><td>Village Area:</td><td> 4343.65465 Sq.Mt</td></tr><tr><td>Community Leader:</td><td> Haji Khan</td></tr></tbody></table> <a href="https://tripp3-labs.vercel.app/register" class="btn btn-danger btn-sm" style="margin-left: 5%; display: inline;">Register with this village</a>'
          // // `Village Name: ${village_name}`
          // )
          // .addTo(map);
          });
          
          map.on('mouseenter', 'clusters', () => {
          map.getCanvas().style.cursor = 'pointer';
          });
          map.on('mouseleave', 'clusters', () => {
          map.getCanvas().style.cursor = '';
          });


           // Add popup on hover
           map.on('mouseenter', 'unclustered-point', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const village_name = e.features[0].properties.village_name;
            map.getCanvas().style.cursor = 'pointer';

            cluster_point_popup=new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
            `Village Name: ${village_name}`
            )
            .addTo(map);

            // const cluster_point_popup =new mapboxgl.Popup({ offset: 25, closeOnClick: false, closeButton: true})
            // .setLngLat(coordinates)
            // .setHTML(
            //   '<table class="table table-striped" style="font-size: 10px;"><thead><tr><th colspan="2" style="text-align:center;">Village Details</th></tr></thead><tbody><tr><td>Country Name:</td><td>Afghanistan</td></tr><tr><td>Village Name:</td><td>Dahani Durum Burjak</td></tr><tr><td>Population:</td><td>4703</td></tr><tr><td>Village Area:</td><td> 4343.65465 Sq.Mt</td></tr><tr><td>Community Leader:</td><td> Haji Khan</td></tr></tbody></table> <a href="https://tripp3-labs.vercel.app/register" class="btn btn-danger btn-sm" style="margin-left: 5%; display: inline;">Register with this village</a>'
            //   // 'No Data Found'
            // ).addTo(map);
          });

          map.on('mouseleave', 'unclustered-point', () => {
            map.getCanvas().style.cursor = '';
            map.getCanvas().style.cursor = '';
            cluster_point_popup.remove();
          });
      })
      .catch((err) => {
        console.log(err)
      });
    // }

   
    


  }, [coordinates]);

  const openSideBar=()=>{
    console.log("hello open")
    showSideBar(true)
  }

  // useEffect(() => {
  //   console.log("second useeffect",coordinates)
  //   // Fly to the new coordinates when they change
  //   if (mapRef.current) {
  //     mapRef.current.flyTo({
  //       center: [coordinates.longitude, coordinates.latitude],
  //       duration: 16000, // Animate over 12 seconds
  //       zoom: 2,
  //       essential: true, // This option ensures that the flyTo completes before other animations start
  //     });

  //     // Update the marker position
  //     const marker = new mapboxgl.Marker({"color": "red"}).setLngLat([coordinates.longitude, coordinates.latitude]).addTo(mapRef.current);
  //   }
  // }, [coordinates]);

  return ( 
     <>
      <button
        onClick={openSideBar}
        style={{height:'40px',marginTop:'8px', marginLeft:'0px',padding:'10px',backgroundColor:'#ffffff',width:'40px'}}
        aria-label="toggle sidebar"
      >
      <GiHamburgerMenu style={{marginBottom:'12px'}} />
      </button>
     <div ref={mapContainerRef} style={{ width: '100%', height: 'calc(100vh - 90px)'}} />
     </>
  );
};

export default MapComponent;
