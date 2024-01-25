import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch, BsFillArrowRightCircleFill } from "react-icons/bs";
import Select from "react-select";
import { useState, useEffect,useRef } from "react";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { AiOutlineRollback } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import axios from "axios";

const LeftSideBar = (props) => {
  const [filtermodal, setFilterModal] = React.useState(false);
  const filtertoggle = () => setFilterModal(!filtermodal);
  
  const [data,setData]=useState()
  const [countryName,setCountryName]=useState('')
  const [villagesList,setVillagesList]=useState()
  const [calculation,setVillagesCountAndStatus]=useState({
    countryCount:0 ,
    provinceCount:0 ,
    districtCount:0 ,
    statusCount: {
        countryVerifiedUser: 0,
        countryNonVerifiedUser: 0,
        stateVerifiedUser: 0,
        stateNonVerifiedUser: 1,
        districtVerifiedUser: 0,
        districtNonVerifiedUser: 0
    }
  })

  const [villages,setVillages]=useState([])

  const [values ,setValues]=useState({
     country:null,
     state:null,
     district:null,
     village:null,
  })



  const framerSidebarBackground = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.2 } },
    transition: { duration: 0.3 },
  };

  const framerSidebarPanel = {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    transition: { duration: 0.3 },
  };

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  //useClickAway(ref, () => setOpen(false));
  const toggleSidebar = () => setOpen((prev) => !prev);

  const hideBar=()=>{
    toggleSidebar()
    props.closeSideBar(false)
  }
 
  useEffect(() => {
 
    if(props.open==true){
      console.log("left side bar",props.open)
       toggleSidebar()
    }
//https://tripp33-backend.vercel.app/tripp3_labs-api/users/
    // axios
    //   .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/`)
    //   .then((res) => {
    //     //setData(res.data.data);
        
    //     setVillages(res.data.data)
        
    //   })
    //   .catch((err) => console.log(err));

      setVillages(props.data)

      // .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/countries`)
      // .then((res) => {
      //     let list=[]
      //    res.data.data.map((ct)=>{
      //     let jsonData={
      //       id:null,
      //       name:'',
      //       state:[]
      //     };
      //     jsonData.id=ct.country_id
      //     jsonData.name=ct.country_name

      //     axios
      //     .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/provinces/${ct.country_id}`)
      //     .then((province) => {
             
            
      //       jsonData.state=province.data.data
            
  
      //       if(jsonData && jsonData.state){
              
      //         jsonData.state.map((dt)=>{
                
  
      //           axios
      //           .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/districts/${dt.id}`)
      //           .then((district) => {
                   
      //             dt['district']=district.data.data
                  

      //             dt.district.map((vil)=>{
      //               vil['village']=[]
      //               axios
      //               .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/villages/${vil.id}`)
      //               .then((village) => {
                       
      //                 vil['village']=village.data.data
                      
                      
      //               }).catch((err) => console.log(err));
      //             })
                
      //           }).catch((err) => console.log(err));
                
               
  
                 
                
                
      //         })
              
      //       }
            
      //     })
      //     .catch((err) => console.log(err));
         
      //     list.push(jsonData)

            
      //    })
         
        
            
      //       setTimeout(()=>{
              
      //         setData(list);
      //       },2000)
        
       
        
      // })
      // .catch((err) => console.log(err));


  }, [props.open]);

    





  const handleChange2 = (e) => {

    let state;
    let status=false
    if(e.target.name==='country'){
      data.map((val)=>{
        if(val.id==e.target.value)
         state=val
      })
    }else if(e.target.name==='state'){
        if(values.country.length!=0 && values.country.state.length!=0){
          values.country.state.map((val)=>{
            if(val.id==e.target.value)
             state=val
          })
        }
       
    }else if(e.target.name==='district'){
      if(values.country.length!=0 && values.state.length!=0 && values.state.district.length!=0){
        values.state.district.map((val)=>{
          if(val.id==e.target.value)
           state=val
        })
      }

    }else{
      if(values.country.length!=0 && values.state.length!=0 && values.district.length!=0
     ){
        villagesList.map((val)=>{
          if(val.id==e.target.value)
           state=val
        })
      }
    }
   

    
    if(status==false){
      setValues({
        ...values,
        [e.target.name]: state
      });
    }



   
  };

  const handleChange = (choice) => {
    setValues({
      ...values,
      ["village"]: choice,
    });
    
    //toggle();
  };

  const applyFilter=()=>{
    props.parentCallback(values.village)
    
    axios
      .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/getUserStatusByLocation/${values.village.id}`)
      .then((res) => {
        //setData(res.data.data);
        
        setVillagesCountAndStatus(res.data.data)
        
      })
      .catch((err) => console.log(err));

      axios
      .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/getCountryByVillage/${values.village.id}`)
      .then((res) => {
        //setData(res.data.data);
        
        setCountryName(res.data.data.country_name)
        
      })
      .catch((err) => console.log(err));

      clearFilter()
    filtertoggle()
  }

  const clearFilter=()=>{
    setValues({
      country:null,
      state:null,
      district:null,
      village:null
    })
    filtertoggle()
  }

  return (

        <>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
             
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 border-zinc-800 bg-zinc-900"
              ref={ref}
              aria-label="Sidebar"
            >

              
              <div className="togglersbtnss">
                <button
                  onClick={hideBar}
                  className="removesss"
                  aria-label="close sidebar"
                >
                  <AiOutlineRollback />
                </button>

              
              </div>

              <button onClick={filtertoggle} className="filterbtnss">
                  {" "}
                <FaFilter /> Filter Stats By Village{" "}
                </button>
                <p>

                </p>
              <ul>
                <div className="userstatus">
                  <h3>User Stats </h3>
                  <div className="userinerr">
                    <h5> Verified Users:</h5>
                    <h6 className="activeeeuser"> {calculation.statusCount.countryVerifiedUser} </h6>
                  </div>

                  <div className="userinerr">
                    <h5>Non-Verified Users:</h5>
                    <h6 className="noactiveuser"> {calculation.statusCount.countryNonVerifiedUser}</h6>
                  </div>
                </div>
                <div className="outercountery">
                  <div className="counterbox">
                    <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}> Village Details</h4>
                    {/* <h3> Country: <span>{countryName}</span>{" "}</h3> */}

                    <div className="iner-countery">
                      <p> Country Name: {countryName} {" "}</p>
                      {" "}
                      <p> Register Villages in {countryName} : <span>{calculation.countryCount}</span>{" "}</p>

                      <p>
                        {" "}
                        Verified users in {countryName}: <span> {calculation.statusCount.countryVerifiedUser}</span>{" "}
                      </p>
                      <p>
                        {" "}
                        Non-verified users in {countryName} : <span> {calculation.statusCount.countryNonVerifiedUser}</span>{" "}
                      </p>
                    </div>
                  </div>

                  {/* <div className="counterbox">
                    <h3> Province:</h3>

                    <div className="iner-countery">
                      <p> :
                      {" "}
                      Villages: <span> {calculation.provinceCount}</span>{" "}
                      </p>

                      <p>
                        {" "}
                        Verified users: <span> {calculation.statusCount.stateVerifiedUser}</span>{" "}
                      </p>
                      <p>
                        {" "}
                        Non-verified users: <span> {calculation.statusCount.stateNonVerifiedUser}</span>{" "}
                      </p>
                    </div>
                  </div>


                  <div className="counterbox">
                    <h3> District:</h3>

                    <div className="iner-countery">
                      <p> 
                      {" "}
                      Villages: <span> {calculation.districtCount}</span>{" "}
                      </p>

                      <p>
                        {" "}
                        Verified users: <span> {calculation.statusCount.districtVerifiedUser}</span>{" "}
                      </p>
                      <p>
                        {" "}
                        Non-verified users: <span> {calculation.statusCount.districtNonVerifiedUser}</span>{" "}
                      </p>
                    </div>
                  </div> */}
                </div>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <Modal isOpen={filtermodal} toggle={filtertoggle}>
          <ModalHeader toggle={filtertoggle}>
       
          </ModalHeader>
          <ModalBody>
             
          <Form.Group controlId="filter1">      
          <InputGroup className="jobsearchfield mb-3">
                    {/* <div className="serach-icons">
                      <BsSearch />
                    </div> */}

                    <Select
                      options={villages}
                      placeholder="Search Villages"
                      onChange={(choice) => handleChange(choice)}
                    />
                  </InputGroup>
           </Form.Group>       
          {/* <Form.Group controlId="filter1">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        aria-readonly="true"
                        defaultValue="Pakistan"
                        className="shadow-none"
                        name="country"
                        required
                        value={values.country?values.country.id:null}
                         onChange={(e) => handleChange2(e)}
                      >
                        <option>Select</option>
                        {data  &&  
                          data.map((ct) => (
                          <option value={ct.id}>{ct.name}</option>
                        ))}
                      </Form.Select>
            </Form.Group>
            
            <Form.Group controlId="filter1">
                      <Form.Label>Province/ State</Form.Label>
                      <Form.Select
                        aria-readonly="true"
                        defaultValue="Pakistan"
                        className="shadow-none"
                        name="state"
                        required
                        value={values.state?values.state.id:null}
                        onChange={(e) => handleChange2(e)}
                      >
                        <option>Select</option>
                        {values.country && values.country.length!=0 &&
                           values.country.state 
                         && values.country.state.length!=0 ?
                        <>
                          {values.country.state.map((st) => (
                          <option value={st.id}>{st.name}</option>
                          ))
                          }
                        </>:''
                        }
                      </Form.Select>
                    </Form.Group>

                     <Form.Group controlId="filter1">
                      <Form.Label>District</Form.Label>
                      <Form.Select
                        aria-readonly="true"
                        defaultValue="Pakistan"
                        className="shadow-none"
                        name="district"
                        required
                        value={values.district?values.district.id:null}
                        onChange={(e) => handleChange2(e)}
                      >
                        <option>Select</option>
                        
                        {values.country && 
                        values.country.length!=0 && 
                        values.state &&
                        values.state.length!=0 &&
                        values.state.district &&
                         values.state.district.length!=0 ?
                        <>
                        
                          {values.state.district.map((dt) => (
                          <option value={dt.id}>{dt.name}</option>
                          ))
                          }
                        </>:''
                        }
                      </Form.Select>
                    </Form.Group>          
                  
                    <Form.Group controlId="filter1">
                      <Form.Label>Village</Form.Label>
                      <Form.Select
                        aria-readonly="true"
                        defaultValue="Pakistan"
                        className="shadow-none"
                        name="village"
                        required
                        value={values.village?values.village.id:null}
                        onChange={(e) => handleChange2(e)}
                      >
                        <option>Select</option>
                      
                        {villagesList ?
                        <>
                        
                          {villagesList.map((vl) => (
                          <option value={vl.id}>{vl.name}</option>
                          ))
                          }
                        </>:''
                        }
                      </Form.Select>
                    </Form.Group> */}
          </ModalBody>
          <ModalFooter>
      
            <Button color="primary" onClick={applyFilter}>
              Apply
            </Button>
            <Button color="danger" onClick={clearFilter}>
              Clear
            </Button>
       
          </ModalFooter>
        </Modal> 
            
    </>
        

  );
};

export default LeftSideBar;
