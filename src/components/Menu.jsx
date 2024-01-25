import Container from "react-bootstrap/Container";
//import LogoutIcon from '@mui/icons-material/Logout';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/images/logo1.png";
//import logo1 from "../assets/images/logopurple.jpeg";
import logo1 from "../assets/images/blacklogo.png";
import { MdDashboard, MdFeaturedPlayList } from "react-icons/md";
import { LiaPollSolid } from "react-icons/lia";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch, BsFillArrowRightCircleFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Select from "react-select";
import axios from "axios";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import CountriesContext from "../pages/CountriesContext";
//import CountriesContext from "../pages/CountriesContext";

const Menu = () => {
  //const {data,coordinates}=useContext(CountriesContext)
  const [coordinates, setCoordinates] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  const [isDarkMode, setDarkMode] = React.useState(false);
  //const [villages,setVillages]=useState([])
  const villages = useContext(CountriesContext);
  const [darktheme, setDarktheme] = useState(false);
  const [isItMap, setIsItMap] = useState(false);
  const [modee, setModee] = useState("light");

  const toggleDarkMode = () => {
    // setDarkMode(true);
    let activemode = localStorage.getItem("mode")
      ? localStorage.getItem("mode")
      : "dark";
    setModee(activemode);
    localStorage.removeItem("mode");
    if (activemode === "light") {
      localStorage.setItem("mode", "dark");
      setDarktheme(true);
      setDarkMode(true);
      console.log("light");
    }

    if (activemode === "dark") {
      localStorage.setItem("mode", "light");
      console.log("dark");
      setDarktheme(false);
      setDarkMode(false);
    }

    window.location.reload();
    console.log("darkmode");
  };

  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let url=window.location.href
     //https://tripp3-labs.vercel.app
    if(url==='https://tripp3-labs.vercel.app/interactivemap'){
        setIsItMap(true)
    }else{
      setIsItMap(false)
    }

    
    // axios
    // .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/`)
    // .then((res) => {
    //   //setData(res.data.data);

    //   setVillages(res.data.data)

    // })
    // .catch((err) => console.log(err));

    setLogin(false);
    if (localStorage.getItem("token")) {
      setLogin(true);
    }
    if (localStorage.getItem("mode")) {
      let mode = localStorage.getItem("mode");

      setDarktheme(mode === "dark" ? true : false);
      setDarkMode(mode === "dark" ? true : false);
    }
  }, [villages,isItMap]);

  const handleChange = (choice) => {
    // setValues({
    //   ...values,
    //   ["village"]: choice,
    // });
    setCoordinates({
      latitude: choice.latitude,
      longitude: choice.longitude,
    });
    navigate("/interactivemap", {
      state: {
        latitude: choice.latitude,
        longitude: choice.longitude,
      },
    });
  };

  const removeToken = () => {
    //setUserId(0)
    localStorage.removeItem("token");
    //localStorage.removeItem("userId");
    //setUser('')
    setLogin(false);
    navigate("/login");
  };

  return (
    <div>
      <section className={darktheme ? "darkthememenu" : ""}>
        <Navbar expand="lg">
          <Container >
            <Navbar.Brand>
              {!darktheme && (
                <Link to="/">
                  <img
                    src={logo1}
                    className="logo"
                    alt="iTribe-logo"
                    width={"100%"}
                  />
                </Link>
              )}

              {darktheme && (
                <Link to="/">
                  <img
                    src={logo1}
                    className="logo"
                    alt="iTribe-logo"
                    width={"100%"}
                    style={{marginLeft:'5px', paddingBottom:'8px'}}
                  />
                </Link>
              )}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="m-auto my-2 my-lg-0" navbarScroll>
                
                {true &&
                <InputGroup
                  style={{color: 'black'}}
                  className="jobsearchfield"
                  
                >
                  
                  <Select
                    options={villages}
                    placeholder="Search Villages"
                    onChange={(choice) => handleChange(choice)}
                  />
                </InputGroup>
                }

                {login == true && (
                  <Link to="/dashboard" className=" DashBorad">
                    <MdDashboard /> DashBoard
                  </Link>
                )}
                {login == true && (
                  <Link to="/peoples" className=" DashBorad">
                    <MdFeaturedPlayList />
                    User List
                  </Link>
                )}
                {login == true && (
                  <Link to="/polls" className=" DashBorad">
                    <LiaPollSolid /> Polls
                  </Link>
                )}
              </Nav>
              <div className="logoutmainnbox">
                <div className="mobileespaceee">
                  {!login && (
                    <>
                      <Link to="/login" className="login-btn mx-3">
                        Login{" "}
                      </Link>
                      <Link to="/register" className="signup-btn">
                        SignUp{" "}
                      </Link>
                    </>
                  )}
                </div>

                <div className="mobilebox">
                  {login ? (
                    <>
                      <div className="modeebutnss">
                        <DarkModeSwitch
                          checked={isDarkMode}
                          onChange={toggleDarkMode}
                          size={30}
                        />
                      </div>
                      <div className="logouttt">
                        <MdLogout
                          onClick={() => removeToken()}
                          className="logouttt"
                        ></MdLogout>
                        <span>Logout</span>
                      </div>
                    </>
                  ) : (
                    <DarkModeSwitch
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                      size={30}
                    />
                  )}
                </div>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </section>
    </div>
  );
};

export default Menu;
