
import Form from "react-bootstrap/Form";
import axios from 'axios'
import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { useState , useEffect} from "react";
import { BsShieldLock } from "react-icons/bs";
import {  BsFillPeopleFill} from "react-icons/bs";
import {  useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import jwt_decode from "jwt-decode";

const Login = () => {

  const [responsemodal, setResponseModal] = React.useState(false);
  const responsetoggle = () => setResponseModal(!responsemodal);
  const [users, setUser] = useState({
    email: "",
    password: "",
  });
  const [userToken, setUserToken] = useState()
  const [msg, setMsg] = useState()
  const navigat = useNavigate();
  // const [isDarkMode, setDarkMode] = React.useState(false);

  const [darktheme ,setDarktheme] = useState(false);
  
  const onChangeValues = (e) => {
    setUser({ ...users, [e.target.name]: e.target.value });
  };

  useEffect(() => {
   
    if(localStorage.getItem("mode")){
      let mode = localStorage.getItem("mode") ;
      
      setDarktheme(mode === "dark" ? true : false);
    }
  }, []);

  const ProcedLogin = (e) => {
    console.log("jsjjjs")
    setMsg('')

    e.preventDefault();
    if(!users.email || !users.password){
      setMsg('Please Add both fields')
      responsetoggle();
      return;
    }
    console.log(process.env.REACT_APP_API)
    axios.post(`https://tripp33-backend.vercel.app/tripp3_labs-api/users/login`,
     users
    ).then((result) => {
      if(result.data.success===0){
       
        setMsg(result.data.message);
         responsetoggle()
        //setSpinner(false);
      }
      else{
        localStorage.setItem("token", result.data.token);
        //var decoded = jwt_decode(result.data.token);
        //setUserToken(decoded.result)
  
          setTimeout(()=>{
            navigat("/dashboard");
            window.location.reload();
          },2000)
      }
    }) 
  
  }
  
  return (
    <div  className={darktheme ? "darktheme" : "loginbg"}>
      <section className="loginpagee" >
        <div className="container">
          <div className="row  login-outer-box-one">
            <div className="col-lg-8  login-inner-box-one">
              
              <div className="login-outer-box-two ">
              
                <div className="inner-box ">
                  <h3 className="emp-heading">Login To iTribe</h3>

                  <div className="samebox-login  ">
                    
                  </div>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <InputGroup className="outer-inputss mb-3">
                        <div className="serach-icons">
                          <BsFillPeopleFill className="f-icpons" />
                        </div>
                        <Form.Control
                          type="email"
                          placeholder="Enter E-Mail"
                          name="email"
                          value={users.email}
                          onChange={(e) => onChangeValues(e)}
                          className="shadow-none"
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>

                      <InputGroup className="outer-inputss  mb-3">
                        <div className="serach-icons">
                          <BsShieldLock className="f-icpons" />
                        </div>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          className="shadow-none"
                          value={users.password}
                          onChange={(e) => onChangeValues(e)}
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="text-center my-3">

                        <button type="submit" className="loginbtns" 
                         onClick={ProcedLogin}> Login
                         </button>
                        
                    </div>

                    <div className="text-center">
                      <a href="/register" className="accountcreate">
                        Create Free Account Now !
                      </a>
                    </div>

                    <div className="samebox-login">
                      <p className={darktheme ? "white-color" : ""}> Not Yet Registered</p>
                      
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
export default Login;
