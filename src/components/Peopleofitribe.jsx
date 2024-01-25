import { FaFilter } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {jwtDecode} from "jwt-decode";
import CountriesContext from "../pages/CountriesContext";
const Peopleofitribe = () => {
  // model variable
  const villagesData=useContext(CountriesContext)
  const [villagesList,setVillagesList]=useState()
  const [show, setShow] = useState(false);
  const [state,setState]=useState({
    country:'',
    state:'',
    district:'',
    village:'',
    gender:'',
    
  })

   const [values ,setValues]=useState({
     country:null,
     state:null,
     district:null,
     village:null,
  })
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState([]);
  //const [villagesData, setVillagesData] = useState([]);
  const [usert, setUser] = useState();
  const [usersData, setUsersData] = useState([]);
  const [darktheme ,setDarktheme] = useState(false);


  const handleChange=(e)=>{
  

    let choice;
    let vName;
     if(e.target.name==='country'){
      villagesData.map((val)=>{
        
        if(val.id==e.target.value){
         choice=val
         vName=val.name
        }
      })
    }else if(e.target.name==='state'){
        if(values.country.length!=0 && values.country.state.length!=0){
          values.country.state.map((val)=>{
            if(val.id==e.target.value){
             choice=val
            vName=val.name
          }
          })
        }
       
    }else if(e.target.name==='district'){
      
      let vList=[]
      axios
          .get(
            `https://tripp33-backend.vercel.app/tripp3_labs-api/villages/villages/${e.target.value}`
            
          )
          .then((village) => {
             setVillagesList(village.data.data) ;
             vList= village.data.data
          })
          .catch((err) => console.log(err));

      if(values.country.length!=0 && values.state.length!=0 && values.state.district.length!=0){
        values.state.district.map((val)=>{
          if(val.id==e.target.value){
            val['village'] =vList
           choice=val
          vName=val.name
          }
        })
      }

    }else if(e.target.name==='village'){
      if(values.country.length!=0 && values.state.length!=0 && values.district.length!=0
       ){
          villagesList.map((val)=>{
          if(val.id==e.target.value){
           choice=val
           vName=val.name
          }
        })
      }
    }else{
         setState({
          ...state,
         [e.target.name]:e.target.value
    })
    }

    if(e.target.name!=='gender'){
    setValues({
      ...values,
      [e.target.name]: choice
    });

        setState({
          ...state,
         [e.target.name]:vName
    })
    }
  }
 
  const clearFilter=()=>{
    setState({
      country:'',
      state:'',
      district:'',
      village:'',
      gender:'',
    })
    
    setValues({
     ...values,
     state:null,
     district:null,
     village:null,
  })
    setUsersData(data)
  }

  const applyFilter=()=>{
        let filter={}
        
        Object.keys(state)
        .map((key) => {
          if(state[key])
            filter[key]=state[key]
        })

     if(state.country || state.state || state.district || state.village || state.gender)
     {
        console.log(filter)

         axios.post(`https://tripp33-backend.vercel.app/tripp3_labs-api/users/getUsersByFilter`,
         filter
        ).then((result) => {
            if(result.data.success===1){
               
               setUsersData(result.data.data)
               handleClose()
             }
            else{
               setUsersData([])
               handleClose()
             }
       }) 

     }
    
     
  }

  useEffect(() => {

    if(localStorage.getItem('token'))
    {
       var decoded = jwtDecode(localStorage.getItem('token'));
       setUser(decoded.result)
       getPeoples(decoded.result)
    }

    if(localStorage.getItem("mode")){
      let mode = localStorage.getItem("mode") ;
      
      setDarktheme(mode === "dark" ? true : false);
    }

    



  
      // axios
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
              
      //         setVillagesData(list);
      //       },7000)
        
       
        
      // })
      // .catch((err) => console.log(err));

    
  }, [villagesData]);

 const getPeoples=(us)=>{
  let url=''
  console.log("us",us)
  if(us.role_id==3){
    url='https://tripp33-backend.vercel.app/tripp3_labs-api/users/'
  }else{
    url=`https://tripp33-backend.vercel.app/tripp3_labs-api/users/country/${us.country_id}`
  }

  axios
  .get(`${url}`)
  .then((res) => {
    setData(res.data.data);
    setUsersData(res.data.data)
  })
  .catch((err) => console.log(err));
 } 

 const changeStatus=(item)=>{
     let status={
      user_status:'Verified'
     };

     
     if(item.user_status==='verified' || item.user_status==='Verified')
        status.user_status='Unverified'

        updateUserStatus(status,item)
    
 }

 const changeLeaderStatus=(item)=>{
  let status={
    designation_id:1
  };

  
  if(item.designation_id==1)
     status.designation_id=2
   

     updateUserStatus(status,item)
}

 const updateUserStatus=(status,item)=>{
  axios
  .put(`https://tripp33-backend.vercel.app/tripp3_labs-api/users/updateUser/${item.id}`,status)
  .then((res) => {
    getPeoples(usert)
    //setData(res.data.data);
    //setUsersData(res.data.data)
  })
  .catch((err) => console.log(err));
 }

 

  return (
    <div  className={darktheme ? "darktheme" : ""}>
      <section className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="space50"></div>
              <div className="sameline-box">
                <h3> People Of iTribe</h3>

                {/* <button class="btn btn-dark" onClick={handleShow}>
                  <FaFilter /> Filter Stats By Village
                </button> */}
              </div>
            </div>+
          </div>
          <div className="space50"></div>
          <div className="row">
            <div className="col-lg-12">
              <div className="tablesbox">
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      {/* <th scope="col">User Name</th> */}
                      <th scope="col">Gender</th>
                      <th scope="col">Country</th>
                      <th scope="col">City</th>
                      {/* <th scope="col">District</th> */}
                      <th scope="col">Village</th>
                      <th scope="col">User Type</th>
                      <th scope="col">User Status</th>
                      <th scope="col">Leader Status</th>
                      <th scope="col">User Action</th>
                      <th scope="col">Leader Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData ?
                    usersData.map((user, i) => (
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{user.first_name ? user.first_name : ""}</td>
                        <td>{user.last_name ? user.last_name : ""}</td>
                        {/* <td>{user.user_name ? user.user_name : ""}</td> */}
                        <td>{user.gender ? user.gender : ""}</td>
                        <td>{user.country ? user.country : ""}</td>
                        <td>{user.city ? user.city : ""}</td>
                        {/* <td>{user.district ? user.district : ""}</td> */}
                        <td>{user.village ? user.village : ""}</td>
                        <td>{
                          (user.role_id==2)
                          ? 'Community Member': 
                          (user.role_id==1) ?
                             'Community Leader':'Visitor'
                          }</td>

                        <td >
                          {user.user_status ? user.user_status : ""}
                        </td>
                      
                        <td>
                          {user.role_id==1 ? (user.designation_id==1)?'Leader':'Not Yet a Leader':''}
                         </td>

                        {usert && (usert.role_id ===3 || usert.role_id==1) &&
                        <td >
                          {usert.role_id==1 && user.role_id==1?'':
                           <button class="btn btn-info" onClick={()=>changeStatus(user)}>
                            Change User Status
                            </button>
                          }
                        </td>
                        }

                         {usert && user.role_id==1 && usert.role_id ===3 &&
                        <td >
                           <button class="btn btn-info" onClick={()=>changeLeaderStatus(user)}>Change Leader Status</button>
                        </td>
                        }

                      </tr>
                    ))
                    :
                      <h5>No Record Found</h5>
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Label>Country</Form.Label>
          <Form.Select name="country" aria-label="Default select example" onChange={e=>handleChange(e)}>
            
            <option>Country menu</option>
             {villagesData &&  
                          villagesData.map((ct) => (
                          <option value={ct.id}>{ct.name}</option>
                        ))}
          </Form.Select>


          <Form.Label>State</Form.Label>
          <Form.Select name="state" aria-label="Default select example" onChange={e=>handleChange(e)}>
           
          <option>Select State</option>
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
          <Form.Label>City</Form.Label>
          <Form.Select name="district" aria-label="Default select example" onChange={e=>handleChange(e)}>
            
            <option> Select City menu</option>
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
          <Form.Label>Village</Form.Label>
          <Form.Select name="village" aria-label="Default select example" onChange={e=>handleChange(e)}>
            
            <option>Select Village </option>
             {villagesList ?
                        <>
                        
                          {villagesList.map((vl) => (
                          <option value={vl.id}>{vl.name}</option>
                          ))
                          }
                        </>:''
                        }
						
          </Form.Select>
          <Form.Label>Gender</Form.Label>
          <Form.Select name="gender" aria-label="Default select example" onChange={e=>handleChange(e)}>
          
            <option>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>
          {/* <Form.Label>Verified</Form.Label>
          <Form.Select name="user_status" aria-label="Default select example" onChange={e=>handleChange(e)}>
           
            <option value="">All</option>
          <option value="true">Verified Users</option>
          <option value="false">Unverified Users</option>
          </Form.Select> */}

          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" onClick={handleClose}>
            Close
          </Button>

          <button class="btn btn-light" onClick={clearFilter}>
          Reset Filter
          </button>
          <button  class="btn btn-info"  onClick={applyFilter}>
          Apply Filter
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Peopleofitribe;
