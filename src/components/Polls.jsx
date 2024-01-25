import { FaFilter } from "react-icons/fa";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { useState,useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import Form from "react-bootstrap/Form";
import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const Polls = () => {
  
  const [addmodal, setAddModal] = React.useState(false);
  const addtoggle = () => setAddModal(!addmodal);

  const [editmodal, setEditModal] = React.useState(false);
  const edittoggle = () => setEditModal(!editmodal);

  const [responsemodal, setResponseModal] = React.useState(false);
  const responsetoggle = () => setResponseModal(!responsemodal);
  const [newpoll ,setNewPoll] = useState({
    title:'',
    description:'',
    voters:0,
    status:1,
    option_y:0,
    option_n:0,
    voted_users:null,
    country_id:null
  });

  const [e_poll ,setEPoll] = useState();
  const [msg, setMsg] = useState();
  const [polls, setPolls] = useState([]);
  const [countries, setCountries] = useState([]);

  const [userToken, setUserToken] = useState([]);
  const [check, setCheck] = useState({
    all:true,
    active:false,
    closed:false
  });
  const [allPolls, setAllPolls] = useState([]);
  const [activePolls, setActivePolls] = useState([]);
  const [closedPolls, setClosedPolls] = useState([]);

  const [darktheme ,setDarktheme] = useState(false);
  useEffect(() => {

    var decoded = jwtDecode(localStorage.getItem('token'));
    setUserToken(decoded.result)
    if(decoded.result.role_id===1){
      setNewPoll({
        ...newpoll,
        country_id:decoded.result.country_id
      })
    }
    getPollsData(decoded.result)

  }, []);
  
  const getPollsData=(userEntity)=>{
      
    let url=""
    let url1=""
    let url2=""
    //https://tripp33-backend.vercel.app
    if(userEntity.role_id==3){
      url='https://tripp33-backend.vercel.app/tripp3_labs-api/polls'
      url1=`https://tripp33-backend.vercel.app/tripp3_labs-api/polls/status/${1}` 
      url2=`https://tripp33-backend.vercel.app/tripp3_labs-api/polls/status/${0}` 
    }else{
      url=`https://tripp33-backend.vercel.app/tripp3_labs-api/polls/country/${userEntity.country_id}`
      url1=`https://tripp33-backend.vercel.app/tripp3_labs-api/polls/country/active/${userEntity.country_id}` 
      url2=`https://tripp33-backend.vercel.app/tripp3_labs-api/polls/country/closed/${userEntity.country_id}` 
    }

    axios
    .get(`${url}`)
    .then((res) => {
      let data=checkVotedUser(res.data.data,userEntity.id)
      setPolls(data);
      setAllPolls(data);
    })
    .catch((err) => console.log(err));

    axios
    .get(`${url1}`)
    .then((res) => {
      let data1=checkVotedUser(res.data.data,userEntity.id)
      setActivePolls(data1);
    })
    .catch((err) => console.log(err));

    axios
    .get(`${url2}`)
    .then((res) => {
      let data2=checkVotedUser(res.data.data,userEntity.id)
      setClosedPolls(data2);
    })
    .catch((err) => console.log(err));
  }
  const checkVotedUser=(data,userId)=>{
   
    data.map(val=>{
         val['percentage_y']=(val.option_y/val.voters)*100
         val['percentage_n']=(val.option_n/val.voters)*100

        if(val.voted_users){
          val['user_voted']=false
           let list=val.voted_users.split(',')
           list.map(li=>{
            if(parseInt(li)==parseInt(userId)){
              val.user_voted=true
            }
           })
            
        }
    })

    return data;
  }

  const handleChange=(name)=>{
     
    if(name==='all'){
      setCheck({
        all:true,
        active:false,
        closed:false
  
      })
      setPolls(allPolls)
    }
  
    else if(name==='active'){
      setCheck({
        all:false,
        active:true,
        closed:false
  
      })
      setPolls(activePolls)
    }else{
      setCheck({
        all:false,
        active:false,
        closed:true
  
      })
      setPolls(closedPolls)
    }
    
  }

  const castVote=(choice,poll)=>{
    let state={};
    state['voters']=poll.voters+1
    if(choice==='yes'){
      state['option_y']=poll.option_y+1
    }else{
      state['option_n']=poll.option_n+1
    }
    if(poll.voted_users)
        state['voted_users']=poll.voted_users + "," + userToken.id
      else
      state['voted_users']=userToken.id

    axios
    .put(`https://tripp33-backend.vercel.app/tripp3_labs-api/polls/updatePoll/${poll.id}`,state)
    .then((res) => {
      getPollsData(userToken)
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
  
    if(localStorage.getItem("mode")){
      let mode = localStorage.getItem("mode") ;
      
      setDarktheme(mode === "dark" ? true : false);
    }
    
    axios
    .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/villages/allcountries`)
    .then((res) => {
      setCountries(res.data.data);
    })
    .catch((err) => console.log(err));


  }, []);

  const handlePollChange=(e)=>{
    setNewPoll({
      ...newpoll,
      [e.target.name]:e.target.value
    })
  }

  const handleEPollChange=(e)=>{
    setEPoll({
      ...e_poll,
      [e.target.name]:e.target.value
    })
  }

  const add_poll=()=>{
     
    if(!newpoll.title || !newpoll.description || !newpoll.country_id){
      setMsg("Kindly add all fields")
      responsetoggle()
    }else{

    axios
    .post(`https://tripp33-backend.vercel.app/tripp3_labs-api/polls/addPoll`,newpoll)
    .then((res) => {
      getPollsData(userToken)
      setMsg("Poll Added Successfully")
      responsetoggle()
      addtoggle ()
    })
    .catch((err) => 
    {
      console.log(err)
      setMsg(err.response.data.message)
      responsetoggle()
      addtoggle()
    }
    );
  }
    
  }
 
  const update_poll=()=>{
     
    if(!e_poll.title || !e_poll.description || !e_poll.country_id){
      setMsg("Kindly add both fields")
      responsetoggle()
    }else{

    axios
    .put(`https://tripp33-backend.vercel.app/tripp3_labs-api/polls/updatePoll/${e_poll.id}`,e_poll)
    .then((res) => {
      getPollsData(userToken)
      setMsg("Poll Updated Successfully")
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

  const editPoll=(id)=>{
    axios
    .get(`https://tripp33-backend.vercel.app/tripp3_labs-api/polls/${id}`)
    .then((res) => {

      setEPoll(res.data.data)
      edittoggle()
    })
    .catch((err) => {
      
    })
  }


  const deletePoll=(id)=>{
    axios
    .delete(`https://tripp33-backend.vercel.app/tripp3_labs-api/polls/${id}`)
    .then((res) => {

      getPollsData(userToken)
      setMsg("Card Deleted Successfully")
      
      responsetoggle()
    })
    .catch((err) => {
      setMsg("Sorry Something Went Wrong")
      responsetoggle()
    })
  }


  return (
    <div>
      <section className={darktheme ? "darktheme" : ""}>
        <div className="container   outer-polss-boxes-main">
          <div className="row">
            <div className="col-lg-12">
              <div className="sameline-box">
                <button className="filterbtnss">
                  {" "}
                  <FaFilter /> Filter Polls{" "}
                </button>
                {userToken && (userToken.role_id===3 || userToken.role_id===1) &&
            <button class="btn btn-info" onClick={addtoggle}>Add Poll</button>
           }
              </div>
             
            </div>
          </div>
          <div className="space50"></div>
          <div className="row">
            <div className="col-lg-12">
              <div className="sametogglefilter-box">
                <div className="allpollstoggless">
                  <Toggle
                    className="alls"
                    id="all"
                    defaultChecked={true}
                    checked={check.all}
                    aria-labelledby="biscuit-label"
                    onChange={()=>handleChange('all')}
                  />

                  <span id="biscuit-label">All </span>
                </div>
                <div className="allpollstoggless">
                  <Toggle
                    id="active"
                    checked={check.active}
                    aria-labelledby="biscuit-label"
                    onChange={()=>handleChange('active')}
                  />

                  <span id="biscuit-label">Active </span>
                </div>
                <div className="allpollstoggless">

                  <Toggle style={{width: "200px"}}
                    id="closed"
                    checked={check.closed}
                    aria-labelledby="biscuit-label"
                    onChange={()=>handleChange('closed')}
                  />

                  <span id="biscuit-label">Closed </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space50"></div>
          <div className="row">
            {polls.map((poll)=>(
              <div className="col-lg-4  polls-boxs">
              <div className="sameline-box">
                <h5>{poll.title}</h5>
                <p className="status">
                  Status: {"  "}
                  <span className={poll.status==1?'statusactive':'statusclosed'}> 
                     {poll.status==1?'Active':'Closed'} 
                  </span>
                </p>
              </div>

              {/* <p className="created">{poll.created_at}</p> */}

              <p>
                {poll.description}
              </p>
              {poll.status==1?
                <div className="twobtnss">
                  {!poll.user_voted?
                  <>
                <button className="yesbtns" onClick={()=>castVote('yes',poll)}> Yes</button>
                <button  className="yesbtns" onClick={()=>castVote('no',poll)}> No</button>
                </>
                :
                <>
                <p>Results </p>
                <div className="twobtnsback">
                  <p>Yes : {poll.percentage_y?poll.percentage_y:0} %</p>
                <ProgressBar variant="success" animated now={poll.percentage_y?poll.percentage_y:0} />
                <br></br>
                <p>No : {poll.percentage_n?poll.percentage_n:0} %</p>
                <ProgressBar animated now={poll.percentage_n?poll.percentage_n:0} />
              </div>
                </>
                }
              </div>:
              <div className="twobtnsback">
                 <p>Yes : {poll.percentage_y?poll.percentage_y:0} %</p>
                <ProgressBar variant="success" animated now={poll.percentage_y?poll.percentage_y:0} />
                <br></br>
                <p>No : {poll.percentage_n?poll.percentage_n:0} %</p>
                <ProgressBar animated now={poll.percentage_n?poll.percentage_n:0} />
              </div>
              }
              
              

              <p className="votersnumber">
                {poll.voters} <span className="voters"> voters </span>{" "}
              </p>

              {(userToken.role_id===1 || userToken.role_id==3) &&
      <>
      <FaEdit className='cursor-pointer' onClick={()=>editPoll(poll.id)}/>
      <MdDelete style={{ marginRight: '20px' }} className='cursor-pointer-d' onClick={()=>deletePoll(poll.id)}/>
      </>
    
    }
              {/* <p className="votersnumber">
                {" "}
                0.00% <span className="voters">of users voted </span>
              </p> */}
            </div>
            ))

            }
            
          </div>
        </div>
      </section>

      <Modal isOpen={addmodal} toggle={addtoggle}>
          <ModalHeader toggle={addtoggle}>Add Poll {userToken && userToken.role_id===1 ?`for
          ${userToken.country_name}`:''}</ModalHeader>
          <ModalBody>

          <Form>
          <Form.Group  controlId="formtitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        required
                        value={newpoll.title}
                        className="shadow-none"
                        onChange={(e) => handlePollChange(e)}
                      />
                    </Form.Group>

                     {userToken && userToken===3 &&
                     <Form.Group controlId="filter1">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        aria-readonly="true"
                        className="shadow-none"
                        name="country_id"
                        required
                        value={newpoll.country_id}
                        onChange={(e) => handlePollChange(e)}
                      >
                        <option>Select</option>
                        {countries  &&  
                          countries.map((ct) => (
                          <option value={ct.id}>{ct.country_name}</option>
                        ))}
                      </Form.Select>
                     </Form.Group>
                      }

                    <Form.Group  controlId="formtotal">
                      <Form.Label>Description </Form.Label>
                      <Form.Control
                        type="text"
                        name="description"
                        required
                        value={newpoll.description}
                        className="shadow-none"
                        onChange={(e) => handlePollChange(e)}
                      />
                    </Form.Group>

            </Form>
          </ModalBody>
          <ModalFooter>
      
            <button class="btn btn-info" onClick={add_poll}>
              Add
            </button>
       
          </ModalFooter>
        </Modal> 

        <Modal isOpen={editmodal} toggle={edittoggle}>
          <ModalHeader toggle={edittoggle}>Update Poll {userToken && userToken.role_id===1 ?`for
          ${userToken.country_name}`:''}</ModalHeader>
          <ModalBody>

          <Form>
          <Form.Group  controlId="formtitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        required
                        value={e_poll && e_poll.title}
                        className="shadow-none"
                        onChange={(e) => handleEPollChange(e)}
                      />
                    </Form.Group>
                    {userToken && userToken===3 &&
                    <Form.Group controlId="filter1">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        aria-readonly="true"
                        className="shadow-none"
                        name="country_id"
                        required
                        value={e_poll && e_poll.country_id}
                        onChange={(e) => handleEPollChange(e)}
                      >
                        <option>Select</option>
                        {countries  &&  
                          countries.map((ct) => (
                          <option value={ct.id}>{ct.country_name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                      }
                    <Form.Group  controlId="formtotal">
                      <Form.Label>Description </Form.Label>
                      <Form.Control
                        type="text"
                        name="description"
                        required
                        value={e_poll && e_poll.description}
                        className="shadow-none"
                        onChange={(e) => handleEPollChange(e)}
                      />
                    </Form.Group>
                       
            </Form>
          </ModalBody>
          <ModalFooter>
      
            <button class="btn btn-info" onClick={update_poll}>
              Update
            </button>
       
          </ModalFooter>
        </Modal> 

        <Modal isOpen={responsemodal} toggle={responsetoggle}>
          <ModalHeader toggle={responsemodal}>Alert</ModalHeader>
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

export default Polls;
