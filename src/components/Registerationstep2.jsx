import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState,useEffect } from "react";
import axios from 'axios'
const Registerationstep2 = (props) => {

  const [foundLocation, setFoundLocation] = useState(false)
  const [values, setValues] = useState({
    country: null,
    state: null,
    district: null,
    village: null,
    community: "",
  });

  const [villagesList,setVillagesList]=useState()
  const [state, setState] = useState({
    country: null,
    country_id:null,
    state: null,
    district: null,
    village: null,
    community: "",
    continent: '',
      city: '',
      address: '',
      latitude: null,
      longitude: null,
  });

  //const LocationFinder = () => {
    const [location, setLocation] = useState({
      continent: '',
      countryName: '',
      city: '',
      address: '',
      latitude: null,
      longitude: null,
      error: null,
    });
  //}
    const handleChange = (e) => {
      setState({
        ...state,
        [e.target.name]:e.target.value
      })
    }

  // const handleChange = (e) => {
  //   let mystate, mystate2;
  //   if (e.target.name === "country") {
  //     data.map((val) => {
  //       if (val.id == e.target.value){
  //        mystate = val;
  //       mystate2 = val.name;
  //       }
  //     });
  //   } else if (e.target.name === "state") {
  //     if (values.country.length != 0 && values.country.state.length != 0) {
  //       values.country.state.map((val) => {
  //         if (val.id == e.target.value) {
  //         mystate = val;
  //         mystate2 = val.name;
  //         }
  //       });
  //     }
  //   } else if (e.target.name === "district") {
  //     let vList=[]
  //     axios
  //         .get(
  //           `https://tripp33-backend.vercel.app/tripp3_labs-api/villages/villages/${e.target.value}`
            
  //         )
  //         .then((village) => {
  //            setVillagesList(village.data.data) ;
  //            vList= village.data.data
  //         })
  //         .catch((err) => console.log(err));
  //     if (
  //       values.country.length != 0 &&
  //       values.state.length != 0 &&
  //       values.state.district.length != 0
  //     ) {
  //       values.state.district.map((val) => {
  //         if (val.id == e.target.value) {
  //           val['village'] =vList
  //         mystate = val;
  //         mystate2 = val.name;
  //         }
  //       });
  //     }
  //   } else if (e.target.name === "village") {
  //     if (
  //       values.country.length != 0 &&
  //       values.state.length != 0 &&
  //       values.district.length != 0 
        
  //     ) {
  //       villagesList.map((val) => {
  //         if (val.id == e.target.value) {
  //         mystate = val;
  //         mystate2 = val.name;
  //         }
  //       });
  //     }
  //   } else {
  //     mystate = e.target.value;
  //     mystate2 = e.target.value;
  //   }

  //   setValues({
  //     ...values,
  //     [e.target.name]: mystate,
  //   });

  //   setState({
  //     ...state,
  //     [e.target.name]: mystate2,
  //   });
  // };

  const [data, setData] = useState();

  const save = (e) => {
    e.preventDefault();
    if (!state && !state.country) {
      return;
    }

    props.step2(state);
  };

  useEffect(() => {

      console.log(props.data)
       axios.get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/allcountries`)
       .then(res=>{
        setData(res.data.data)
       }).catch(err=>{
        console.log(err)
       })
      
  
  }, []);



  const handleFindLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Use the OpenCage Geocoding API to get city and address based on coordinates
            // const apiKey = '8929f7e857994a849fff090f041287fc';
            // const geocodingApiUrl = https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1&no_annotations=1;
            const geocodingApiUrl = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en';
            const response = await axios.get(geocodingApiUrl);
            console.log(response.data.city);
            const continent = response.data.continent;
            const countryName = response.data.countryName;
            const city = response.data.city;
            const address = response.data.locality;
            setState({
              ...state,
              ['continent'] : response.data.continent,
              ['country'] : response.data.countryName,
              ['city'] : response.data.city,
              ['address'] : response.data.locality,
              ['longitude'] : longitude,
              ['latitude'] : latitude
            })

            setLocation({
              continent,
              countryName,
              city,
              address,
              latitude,
              longitude,
              error: null,
            });
          } catch (error) {
            setLocation({
              continent: '',
              countryName: '',
              city: '',
              address: '',
              latitude: null,
              longitude: null,
              error: 'Error fetching location information.',
            });
          }
        },
        (error) => {
          setLocation({
            continent: '',
            countryName: '',
            city: '',
            address: '',
            latitude: null,
            longitude: null,
            //error: Error: ${error.message},
          });
        }
      );
    } else {
      setLocation({
        continent: '',
        countryName: '',
        city: '',
        address: '',
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by your browser.',
      });
    }

    setFoundLocation(true)
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="register-outer">
              <div className="register-inner">
                <Form onSubmit={save}>
                  <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={props.darktheme?'white-color':''}>Select Your Country</Form.Label>
                    <Form.Select
                      onChange={(e) => handleChange(e)}
                      name="country_id"
                      required
                      value={state.country_id}
                      aria-label="Default select example"
                    >
                      <option>Open this select menu</option>
                      {data && data.map((ct) => (
                        <option value={ct.id}>{ct.country_name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Select Sate</Form.Label>
                    <Form.Select
                      onChange={(e) => handleChange(e)}
                      value={values.state ? values.state.id : null}
                      name="state"
                      aria-label="Default select example"
                    >
                      <option>Open Province menu</option>
                      {values.country &&
                      values.country.length != 0 &&
                      values.country.state &&
                      values.country.state.length != 0 ? (
                        <>
                          {values.country.state.map((st) => (
                            <option value={st.id}>{st.name}</option>
                          ))}
                        </>
                      ) : (
                        ""
                      )}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput1"
                  >
                    {" "}
                    <Form.Label> Select District</Form.Label>
                    <Form.Select
                      onChange={(e) => handleChange(e)}
                      name="district"
                      value={values.district ? values.district.id : null}
                      aria-label="Default select example"
                    >
                      <option>Open District menu</option>
                      {values.country &&
                      values.country.length != 0 &&
                      values.state &&
                      values.state.length != 0 &&
                      values.state.district &&
                      values.state.district.length != 0 ? (
                        <>
                          {values.state.district.map((dt) => (
                            <option value={dt.id}>{dt.name}</option>
                          ))}
                        </>
                      ) : (
                        ""
                      )}
                    </Form.Select>
                  </Form.Group> */}

                  <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput1"
                  >
                    {" "}
                    <Form.Label className={props.darktheme?'white-color':''}> Enter Your Village Name</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Village"
                        className="shadow-none"
                      onChange={(e) => handleChange(e)}
                      name="village"
                      value={state.village}
                      //value={values.village ? values.village.id : null}
                      aria-label="Default select example">

                    </Form.Control>
                    {/* <Form.Select
                      onChange={(e) => handleChange(e)}
                      name="village"
                      value={values.village ? values.village.id : null}
                      aria-label="Default select example"
                    >
                      <option>Open Village menu</option>
                      {villagesList ? (
                        <>
                          {villagesList.map((vl) => (
                            <option value={vl.id}>{vl.name}</option>
                          ))}
                        </>
                      ) : (
                        ""
                      )}
                    </Form.Select> */}
                  </Form.Group>

                  <Form.Group
                    className="mb-2"
                    onChange={(e) => handleChange(e)}
                    value={state.community}
                    name="community"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label className={props.darktheme?'white-color':''}>Coummunity</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                  
                  <button type="button" style={{ width: '100%'  }} class="btn btn-warning btn-sm btn-block"
                    onClick={handleFindLocation}>Allow Current Location
                  </button>


                  {/* <Form.Group
                    className="mb-2 mt-2"
                    controlId="exampleForm.ControlInput1"
                  >
                    {" "}
                    <Form.Label className={props.darktheme?'white-color':''}> Continent</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Click Allow Current Location Button to Fill this Field"
                        className="shadow-none"
                      onChange={(e) => handleChange(e)}
                      name="continent"
                      readOnly
                      value={state.continent}
                      aria-label="Default select example">

                    </Form.Control>
                  </Form.Group> */}

                 
                    
                  
                  <Form.Group>
                  <Form.Label className={props.darktheme?'white-color':''}>City</Form.Label>
                    <Form.Control 
                      required
                      type="text"
                      placeholder="Click Allow Current Location Button to Fill this Field"
                      className="shadow-none"
                      onChange={(e) => handleChange(e)}
                      name="city"
                      // readOnly
                      value={state.city}
                      aria-label="Default select example">

                    </Form.Control>
                    
                  </Form.Group>
                    
                  <Form.Group>
                  <Form.Label className={props.darktheme?'white-color':''}>Address</Form.Label>
                    <Form.Control 
                      required
                      type="text"
                      placeholder="Click Allow Current Location Button to Fill this Field"
                      className="shadow-none"
                      onChange={(e) => handleChange(e)}
                      name="address"
                      // readOnly
                      value={state.address}
                      aria-label="Default select example">

                    </Form.Control>
                    
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-2"
                      >
                        <Form.Label className={props.darktheme?'white-color':''}>Latitude</Form.Label>
                        <Form.Control
                          required
                          // readOnly
                          name="lat"
                          placeholder="Latitude"
                          value={state.latitude}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-2"
                      >
                        <Form.Label className={props.darktheme?'white-color':''}>Longitude</Form.Label>
                        <Form.Control
                          required
                          // readOnly
                          name="lon"
                          placeholder="Longitude"
                          value={state.longitude}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="samelineee">
                    
                    {/* {foundLocation && */}
                    <button type="submit" class="btn btn-light">
                      Register
                    </button>
                    {/* } */}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registerationstep2;
