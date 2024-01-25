import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { color } from "framer-motion";
const MainScreen = () => {

  const [login, setLogin] = useState(false);
  const [darkmode , setDarkMode] =useState(false);
  //const navigate = useNavigate()
  useEffect(() => {
    setLogin(false);
    if (localStorage.getItem("token")) {

      setLogin(true);
    }
    if(localStorage.getItem("mode")){
      let mode = localStorage.getItem("mode") ;
      
      setDarkMode(mode === "dark" ? true : false);
    }

  }, []);
  return (
    <section className={darkmode  ? "darktheme" : "bgherooo"   }>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-sec">
              <h1> Welcome To iTribe</h1>

              <p className={darkmode ? "white-color" : ""}>
                iTribe is a community dedicated to connecting the lost tribes of
                Israel. We believe in fostering unity, understanding, and mutual
                respect among all tribes.
              </p>

              {/* <p className={darkmode ? "white-color" : ""}>
                Our platform offers a variety of features to enhance your
                journey of discovery and connection. These include our
                interactive map, in-depth community profiles, and interactive
                forums for members to share their experiences and learn from
                each other.
              </p> */}

              <div className="mainbtns">

              <Link to="/interactivemap" className="expolreee ">
            Explore Interactive Map
          </Link>
          <Link to={login?'/dashboard':'/register'} className="expolreee">
            join Us Today 
          </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainScreen;
