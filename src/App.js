import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainScreen from "./pages/MainScreen";
import ParentComponent from "./Home_comp";
import Menu from "./components/Menu";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Peopleofitribe from "./components/Peopleofitribe";
import Polls from "./components/Polls";
import Interactivemap from "./pages/Interactivemap";
import Registerationstep1 from "./components/Registerationstep1";
import Registerationstep2 from "./components/Registerationstep2";
import { useState, useEffect } from "react";
import axios from "axios";
import CountriesContext from "./pages/CountriesContext";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
 
    axios
    .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/`)
    .then((res) => {
      //setData(res.data.data);
      
      setData(res.data.data)
      
    })
    .catch((err) => console.log(err));

    // axios
    //   .get(
    //     `https://tripp33-backend.vercel.app/tripp3_labs-api/villages/countries`
    //   )
    //   .then((res) => {
    //     let list = [];
    //     res.data.data.map((ct) => {
    //       let jsonData = {
    //         id: null,
    //         name: "",
    //         state: [],
    //       };
    //       jsonData.id = ct.country_id;
    //       jsonData.name = ct.country_name;

    //       axios
    //         .get(
    //           `https://tripp33-backend.vercel.app/tripp3_labs-api/villages/provinces/${ct.country_id}`
    //         )
    //         .then((province) => {
    //           jsonData.state = province.data.data;

    //           if (jsonData && jsonData.state) {
    //             jsonData.state.map((dt) => {
    //               axios
    //                 .get(
    //                   `https://tripp33-backend.vercel.app/tripp3_labs-api/villages/districts/${dt.id}`
    //                 )
    //                 .then((district) => {
    //                   dt["district"] = district.data.data;

    //                   // dt.district.map((vil) => {
    //                   //   vil["village"] = [];
    //                   //   axios
    //                   //     .get(
    //                   //       `https://tripp33-backend.vercel.app/tripp3_labs-api/villages/villages/${vil.id}`
                            
    //                   //     )
    //                   //     .then((village) => {
    //                   //       vil["village"] = village.data.data;
    //                   //     })
    //                   //     .catch((err) => console.log(err));
    //                   // });
    //                 })
    //                 .catch((err) => console.log(err));
    //             });
    //           }
    //         })
    //         .catch((err) => console.log(err));

    //       list.push(jsonData);
    //     });

    //     setData(list);
      
    //    })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <CountriesContext.Provider value={data}>
      <div>
        <section className="top-menu">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <Menu />
              </div>
            </div>
          </div>
        </section>

        <Routes>
          <Route path="/" element={<MainScreen />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/peoples" element={<Peopleofitribe />} />

          <Route path="/polls" element={<Polls />} />

          <Route path="/interactivemap" element={<Interactivemap />} />
          <Route path="/mapTest" element={<ParentComponent />} />
          <Route path="/stepone" element={<Registerationstep1 />} />
          <Route path="/steptwo" element={<Registerationstep2 />} />
        </Routes>
      </div>
    </CountriesContext.Provider>
  );
}

export default App;
