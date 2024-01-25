import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const Registerationstep1 = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    gender: "",
    date_of_birth: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    let val;
    val = e.target.value;

    setState({
      ...state,
      [e.target.name]: val,
    });
  };

  const getDateFormat = () => {
    let months = [
      { id: "01", val: "Jan" },
      { id: "02", val: "Feb" },
      { id: "03", val: "Mar" },
      { id: "04", val: "Apr" },
      { id: "05", val: "May" },
      { id: "06", val: "Jun" },
      { id: "07", val: "Jul" },
      { id: "08", val: "Aug" },
      { id: "09", val: "Sep" },
      { id: "10", val: "Oct" },
      { id: "11", val: "Nov" },
      { id: "12", val: "Dec" },
    ];
    let list = startDate.toString().split(" ");
    months.map((m) => {
      if (m.val === list[1]) {
        list[1] = m.id;
      }
    });
    state.date_of_birth = list[3] + "/" + list[1] + "/" + list[2];
  };

  const save = (e) => {
    let flag = true;
    getDateFormat();
    e.preventDefault();
    console.log(state);
    Object.values(state).forEach((val) => {
      if (!val || val == null || val == "") {
        flag = false;
        return false;
      }
      return false;
    });
    if (!flag) {
      return;
    } else {
      props.step1(state);
    }
  };

  const gottoback = () => {
    navigate("/register");
  };
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="register-outer">
              <div className="register-inner">
                <h3> Registeration</h3>
                <Form onSubmit={save}>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={props.darktheme?'white-color':''}>First Name</Form.Label>
                        <Form.Control
                          required
                          onChange={(e) => handleChange(e)}
                          placeholder="First name"
                          name="first_name"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={props.darktheme?'white-color':''}>Last Name</Form.Label>
                        <Form.Control
                          name="last_name"
                          required
                          onChange={(e) => handleChange(e)}
                          placeholder="Last name"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={props.darktheme?'white-color':''}>User Name</Form.Label>
                      <Form.Control
                        name="user_name"
                        onChange={(e) => handleChange(e)}
                        required
                        placeholder="User name"
                      />
                    </Form.Group>
                  </Row>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={props.darktheme?'white-color':''}>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={(e) => handleChange(e)}
                      required
                      placeholder="name@example.com"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={props.darktheme?'white-color':''}>Passowrd</Form.Label>
                    <Form.Control
                      type="text"
                      name="password"
                      onChange={(e) => handleChange(e)}
                      required
                      placeholder="name@example.com"
                    />
                  </Form.Group>
                  <Row>
                    <Form.Label className={props.darktheme?'white-color':''}>Date of Birth</Form.Label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="form-control shadow-none"
                      dateFormat="dd/MM/yyyy"
                      required
                    />
                  </Row>

                  <Row>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                      required
                      onChange={(e) => handleChange(e)}
                    >
                      <Form.Label className={props.darktheme?'white-color':''}>Gender</Form.Label>
                      <div className="datiosamee">
                        <Form.Check
                          value="Male"
                          name="gender"
                          type="radio"
                          aria-label="radio 1"
                          label="Male"
                        />
                        <Form.Check
                          value="Female"
                          name="gender"
                          type="radio"
                          aria-label="radio 2"
                          label="Female"
                        />
                      </div>
                    </Form.Group>
                  </Row>

                  <div className="samelineee">
                    {/* <button
                      type="button"
                      class="btn btn-light"
                      onClick={() => gottoback()}
                    >
                      Prev
                    </button> */}
                    <button type="submit" class="btn btn-light">
                      Next
                    </button>
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

export default Registerationstep1;
