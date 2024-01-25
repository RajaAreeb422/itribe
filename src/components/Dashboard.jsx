
import {useState,useEffect} from 'react'
import Form from "react-bootstrap/Form";
import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {jwtDecode} from "jwt-decode";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md"

const Dashboard = () => {
  
  const [addmodal, setAddModal] = React.useState(false);
  const addtoggle = () => setAddModal(!addmodal);

  const [editmodal, setEditModal] = React.useState(false);
  const edittoggle = () => setEditModal(!editmodal);

  const [responsemodal, setResponseModal] = React.useState(false);
  const responsetoggle = () => setResponseModal(!responsemodal);
  const [user, setUser] = useState();
  const [msg, setMsg] = useState();
  const [data,setData]=useState([])
  const [countries,setCountries]=useState([])
  const [darktheme ,setDarktheme] = useState(false);
  const [card ,setCard] = useState({
    title:'',
    total:0,
    growth:0,
    country_id:null
  });
  const [e_card ,setECard] = useState();
  useEffect(() => {

  
    if(localStorage.getItem("mode")){
      let mode = localStorage.getItem("mode") ;
      setDarktheme(mode === "dark" ? true : false);

    }

    if(localStorage.getItem('token')){
      var decoded = jwtDecode(localStorage.getItem('token'));
      setUser(decoded.result)
      if(decoded.result.role_id===1){
        setCard({
          ...card,
          country_id:decoded.result.country_id
        })
      
      }
      let cId=decoded.result.country_id ? decoded.result.country_id :null
        
      if(cId){
     
      getDashboardData(decoded.result)
      }
    }

   

    axios
    .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/allcountries`)
    .then((res) => {
      setCountries(res.data.data);
     
    })
    .catch((err) => console.log(err));
  },[data])

 const getDashboardData =(userEntity)=>{
  let url=""
  if(userEntity.role_id==3){
    url='https://tripp33-backend.vercel.app/tripp3_labs-api/dashboard/'
  }else{
    url=`https://tripp33-backend.vercel.app/tripp3_labs-api/dashboard/country/${userEntity.country_id}`
  }

  axios
  .get(`${url}`)
  .then((res) => {
    setData(res.data.data);
   
  })
  .catch((err) => console.log(err));
 }
  
  const handleCardChange=(e)=>{
    console.log('value',e.target.value)
    setCard({
      ...card,
      [e.target.name]:e.target.value
    })
  }

  const handleECardChange=(e)=>{
    setECard({
      ...e_card,
      [e.target.name]:e.target.value
    })
  }

  const add_card=()=>{
     
    if(!card.title || !card.country_id){
      setMsg("Title and Country must be added")
      responsetoggle()
    }else{

      console.log('card',card)
    // axios
    // .post(`https://tripp33-backend.vercel.app/tripp3_labs-api/dashboard/addCard`,card)
    // .then((res) => {
    //   setData(res.data.data);
    //   setMsg("Card Added Successfully")
    //   responsetoggle()
    //   addtoggle ()
    // })
    // .catch((err) => 
    // {
    //   console.log(err)
    //   setMsg(err.response.data.message)
    //   responsetoggle()
    //   addtoggle()
    // }
    // );
  }
    
  }

  const update_card=()=>{
     
    if(!e_card.title || !e_card.country_id){
      setMsg("Title and Country must be added")
      responsetoggle()
    }else{

    axios
    .put(`https://tripp33-backend.vercel.app/tripp3_labs-api/dashboard/${e_card.id}`,e_card)
    .then((res) => {
      setData(res.data.data);
      setMsg("Card Updated Successfully")
      responsetoggle()
      edittoggle ()
    })
    .catch((err) => 
    {
      console.log(err)
      setMsg(err.response.data.message)
      responsetoggle()
      edittoggle()
    }
    );
  }
    
  }
  
  const editCard=(id)=>{
    axios
    .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/dashboard/${id}`)
    .then((res) => {

      setECard(res.data.data)
      edittoggle()
    })
    .catch((err) => {
      
    })
  }


  const deleteCard=(id)=>{
    axios
    .delete(`https://tripp33-backend.vercel.app/tripp3_labs-api/dashboard/${id}`)
    .then((res) => {

      setMsg("Card Deleted Successfully")
      getDashboardData(user)
      responsetoggle()
    })
    .catch((err) => {
      setMsg("Sorry Something Went Wrong")
      responsetoggle()
    })
  }

  return (
    <div className={darktheme ? "darktheme" : ""}>
      
     

      <section className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-lg-12"></div>
          </div>
          <div className="space50"></div>
          {user && (user.role_id===3 || user.role_id===1) &&
            <button class="btn btn-info" onClick={addtoggle}>Add Card</button>
           }
           <p></p>
          <div className="row">
            
            {data && 
            data.map((da)=>(
  <div className="col-lg-4  outer-box">
  <div className="inner-boxes">
    <h3> {da.title}</h3>

    <div className="inner-two-box">
      <p>
        Total: <span> {da.total}</span>{" "}
      </p>
      <p>
        Growth: <span> {da.growth} </span>
      </p>
    </div>
    {(user.role_id==3 || user.role_id===1) &&
      <>
      <FaEdit className='cursor-pointer'  onClick={()=>editCard(da.id)}/>
      <MdDelete style={{ marginRight: '20px' }} className='cursor-pointer-d' onClick={()=>deleteCard(da.id)}/>
      </>
    }
  
  </div>
</div>
            ))

            }
 

          <div className="space50"></div>
         
        </div>
        </div>
      </section>

        <Modal isOpen={addmodal} toggle={addtoggle}>
          <ModalHeader toggle={addtoggle}>Add Card {user && user.role_id===1 ?`for
          ${user.country_name}`:''}
          </ModalHeader>
          <ModalBody>

          <Form>
          <Form.Group  controlId="formtitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        required
                        value={card.title}
                        className="shadow-none"
                        onChange={(e) => handleCardChange(e)}
                      />
                    </Form.Group>

                    <Form.Group  controlId="formtotal">
                      <Form.Label>Total </Form.Label>
                      <Form.Control
                        type="number"
                        name="total"
                        required
                        value={card.total}
                        className="shadow-none"
                        onChange={(e) => handleCardChange(e)}
                      />
                    </Form.Group>

                    <Form.Group  controlId="formgrowth">
                      <Form.Label>Growth </Form.Label>
                      <Form.Control
                        type="number"
                        name="growth"
                        required
                        value={card.growth}
                        className="shadow-none"
                        onChange={(e) => handleCardChange(e)}
                      />
                    </Form.Group>

                    {user && user.role_id===3 && 
                    <Form.Group controlId="filter1">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        aria-readonly="true"
                        className="shadow-none"
                        name="country_id"
                        required
                        value={card.country_id}
                        onChange={(e) => handleCardChange(e)}
                      >
                        <option>Select</option>
                        {countries  &&  
                          countries.map((ct) => (
                          <option value={ct.id}>{ct.country_name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                   }
            </Form>
          </ModalBody>
          <ModalFooter>
      
            <button class="btn btn-info" onClick={add_card}>
              Add
            </button>
       
          </ModalFooter>
        </Modal> 

        <Modal isOpen={editmodal} toggle={edittoggle}>
          <ModalHeader toggle={edittoggle}>Edit Card {user && user.role_id===1 ?`for
          ${user.country_name}`:''}</ModalHeader>
          <ModalBody>

          <Form>
          <Form.Group  controlId="formtitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        required
                        value={e_card && e_card.title}
                        className="shadow-none"
                        onChange={(e) => handleECardChange(e)}
                      />
                    </Form.Group>

                    <Form.Group  controlId="formtotal">
                      <Form.Label>Total </Form.Label>
                      <Form.Control
                        type="number"
                        name="total"
                        required
                        value={e_card && e_card.total}
                        className="shadow-none"
                        onChange={(e) => handleECardChange(e)}
                      />
                    </Form.Group>

                    <Form.Group  controlId="formgrowth">
                      <Form.Label>Growth </Form.Label>
                      <Form.Control
                        type="number"
                        name="growth"
                        required
                        value={e_card && e_card.growth}
                        className="shadow-none"
                        onChange={(e) => handleECardChange(e)}
                      />
                    </Form.Group>

                   {user && user.role_id===3 &&
                    <Form.Group controlId="filter1">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        aria-readonly="true"
                        className="shadow-none"
                        name="country_id"
                        required
                        value={e_card && e_card.country_id}
                        onChange={(e) => handleECardChange(e)}
                      >
                        <option>Select</option>
                        {countries  &&  
                          countries.map((ct) => (
                          <option value={ct.id}>{ct.country_name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                 }
            </Form>
          </ModalBody>
          <ModalFooter>
      
            <button class="btn btn-info" onClick={update_card}>
              Update
            </button>
       
          </ModalFooter>
        </Modal> 

        <Modal isOpen={responsemodal} toggle={responsetoggle}>
          <ModalHeader toggle={responsetoggle}>Alert</ModalHeader>
          <ModalBody>
            <p >{msg}</p>
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

export default Dashboard;
