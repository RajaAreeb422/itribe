import { useNavigate } from "react-router-dom";
import { useState, useEffect,useContext} from "react";
import React from "react";
import Registerationstep1 from "./Registerationstep1";
import Registerationstep2 from "./Registerationstep2";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import CountriesContext from "../pages/CountriesContext";

const Register = () => {
  const data=useContext(CountriesContext)
  const [responsemodal, setResponseModal] = React.useState(false);
  const responsetoggle = () => setResponseModal(!responsemodal);
  const [msg, setMsg] = useState();
  const [state, setState] = useState();
  const [page, setPage] = useState({
    one: true,
    two: false,
    three: false,
  });
  const navigat = useNavigate();
  const [darktheme ,setDarktheme] = useState(false);
  useEffect(() => {
    setState({
      ...state,
      role_id: 2,
    });

   
  }, [data]);

  const handleChange = (e) => {
    setState({
      ...state,
      ["role_id"]: e.target.value,
    });
  };

  const getStep1Data = (data) => {
    setState({
      ...state,
      first_name: data.first_name,
      last_name: data.last_name,
      user_name: data.user_name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      date_of_birth: data.date_of_birth,
    });

    setPage({
      one: false,
      two: false,
      three: true,
    });
  };

  const getStep2Data = (data) => {
    setState({
      ...state,
      country: data.country,
      state: data.state,
      district: data.district,
      village: data.village,
      community: data.community,
    });

    let values={...state,
    country:data.country,
    country_id:data.country_id,
    city:data.city,
    address:data.address,
    continent:data.continent,
    latitude:data.latitude,
    longitude:data.longitude,
    state:data.state,
    district:data.district,
    village:data.village,
    community:data.community
    }
    
    signup(values);
  };


  useEffect(() => {
    
    if(localStorage.getItem("mode")){
      let mode = localStorage.getItem("mode") ;
      
      setDarktheme(mode === "dark" ? true : false);
    }
  }, []);
  const signup = (values) => {

    //console.log('values',values)

    axios
      .post(
        `https://tripp33-backend.vercel.app/tripp3_labs-api/users/signup`,
        values
      )
      .then((result) => {
        if (result.data.success === 0) {
          setMsg(result.data.message);
          responsetoggle();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          //setSpinner(false);
        } else {
          setMsg(result.data.message);
          responsetoggle();
          setTimeout(() => {
            navigat("/login");
            window.location.reload();
          }, 2000);
        }
      });
  };

  const gotonextstage = (e) => {
    e.preventDefault();
    if (!state || !state.role_id) {
      return;
    }

    setPage({
      one: false,
      two: true,
      three: false,
    });
    //navigate ("/stepone");
  };

  return (
    <div className={darktheme ? "darktheme" : "rigesterbg"}>
      {page.one && (
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="register-outer">
                  <div className="register-inner">
                    <h3 className={darktheme ? "white-color" : ""}>Select Member Type </h3>
                    <form onSubmit={gotonextstage}>
                      <label className={darktheme ? "white-color text-center" : "text-center"} for="lang">
                        I am registering as a:
                      </label>

                      <select
                        onChange={(e) => handleChange(e)}
                        name="languages"
                        required={true}
                        id="lang"
                        className="midddleee"
                      >
                        <option value={2}>Community Member</option>
                        <option value={1}>Community Leader</option>
                        <option value={4}>Visitor</option>
                      </select>
                      <div className="text-center">
                        <button type="submit" className="submits">
                          {" "}
                          Next
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {page.two && <Registerationstep1 darktheme={darktheme} step1={getStep1Data} />}
      {/* save={getStep1Data} */}
      {page.three && <Registerationstep2 darktheme={darktheme} data={data} step2={getStep2Data} />}

      <Modal isOpen={responsemodal} toggle={responsetoggle}>
        <ModalHeader toggle={responsemodal}>Alert</ModalHeader>
        <ModalBody>
          <p>{msg}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={responsetoggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Register;
