import React from "react";
import Input from "./Input";
import "./Login.css";
import axios from "axios";
import * as Constants from "../Constants";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import AutomationImage from "../../assets/library-background.jpg";
// import { BrowserRouter as Redirect } from "react-router-dom";
import AuthenticationService from "../services/authenticationService";
// import Loader from "react-loader-spinner";
// import ItemService from "../Service/syntbots-service";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg"
import history from "../../history";

class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.itemService = new ItemService();

    this.state = {
      displayLoader: false,
      username: "",
      password: "",
      otperr: false,
      redirectGuest: false,
      redirectAdmin: false,
      validate: false,
      inavalidUser: false,
      requireOTP: false,
      showSuccessMessage: false,
      hasLoginFailed: false,
      isValidLogin: false,
      value: "Atos",
      options: [],
      allTenants: [],
      usertypes:[],
      selectedUserType: "",
      redirect: false,
      forgotpwd: false,
      errorMsg: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleselectoptChange = this.handleselectoptChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.handleforgotpwdClose = this.handleforgotpwdClose.bind(this);
    this.handleforgotpwd = this.handleforgotpwd.bind(this);
  }

  animatedComponents = makeAnimated();

  handleforgotpwdClose = () => {
    this.setState({ forgotpwd: false });
  }
  handleforgotpwd = () => {
    this.setState({ forgotpwd: true });
  }
  componentDidMount() {
    this.getAllTenants(false);
  }
  handleselectoptChange = (event) => {
    this.setState({ value: event.target.value });
    sessionStorage.setItem(
      // Constants.USER_TENANT_NAME_SESSION_ATTRIBUTE_NAME,
      event.target.value
    );
  }

  getAllTenants() {
    axios
      .get(
        Constants.getallusertypes,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )


    .then(async (res) => {
      var response = await [res.data];
      debugger;
      var usertypes = { ...this.state.usertypes };
      usertypes = response;
      this.setState({ usertypes: usertypes });
debugger;
      // Set date for drop down
      var options = { ...this.state.options };
      options = [];

      var option = {};
      debugger;

      for (let i = 0; i < usertypes[0].length; i++) {
        option = {};
        option.label = usertypes[0][i].u_type;
        option.value = usertypes[0][i].u_type;
        debugger;

        options.push(option);
        debugger;

      }

      this.setState({ options: options });
      debugger;

    });
  }

  handleLogin = () => {
    this.setState({ displayLoader: true });

    AuthenticationService.executeBasicAuthenticationService(
      this.state.username ,
      this.state.password
    )
      .then((res) => {
        // var navigate = useNavigate();
        if (res.status==200) {
            debugger;
            sessionStorage.setItem(Constants.AUTH, res.data.token);
            sessionStorage.setItem(Constants.USERID, res.data.u_id);

          }
          // window.location.href('https://www.google.com')

        AuthenticationService.registerSuccessfulLogin(
          this.makeLowerCase(this.state.username),
          this.state.password,
        );


        // for (let i = 0; i < this.state.usertypes[0].length; i++) {

          if (this.state.selectedUserType == 'librarian'){
            debugger;
            this.props.history.push('/librarian');
          }
        else{
          this.props.history.push('/members');
          }

       // }
        // navigate("/documents");
        debugger;

      })
      .catch((error) => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
        // if(error.message.includes('401')) {
        //   this.setState({errorMsg: "Inactive or Invalid User"})
        // }else {
        //   this.setState({errorMsg: "Invalid Credentials"})
        // }
        this.setState({errorMsg: "Invalid Credentials"})
      });
  }
  // AuthenticationService.executeJwtAuthenticationService(
  //   this.state.username,
  //   this.state.password
  // )
  //   .then(
  //     response => {
  //       const { role } = response.data;
  //       console.log(this.state.username);
  //       this.setState({ displayLoader: false });
  //       AuthenticationService.registerSuccessfulLoginForJwt(
  //         response.data.username,
  //         response.data.jwt,
  //         role[0].authority.split("_")[1]
  //       );

  //       if ((role[0].authority.split("_")[1]).indexOf("ADMIN") > -1) {
  //         this.setState({ redirectAdmin: true, redirectGuest: false, validate: true });
  //       } else {
  //         this.setState({ redirectGuest: true, redirectAdmin: false, validate: true });
  //       }
  //     },
  //     error => {
  //       //==============Do Not Delete - Vijay
  //       /*if (this.state.inavalidUser === false) {
  //         alert(
  //           "Something went wrong. We are working on getting this fixed as soon as we can. You may be able to try again"
  //         );
  //         console.log(error);
  //         this.setState({ displayLoader: false });
  //       }*/
  //       if (error.response.status === 401) {
  //         this.setState({ displayLoader: false, inavalidUser: true });
  //       }
  //     }
  //   )
  //   .catch(() => {
  //     this.setState({ showSuccessMessage: false, hasLoginFailed: true });
  //   });
  //}

  handleChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value, inavalidUser: false });
  };
  KeyPress = (event) => {
    if (event.key === "Enter") {
      this.clickHandler();
    }
  };
  setValidation() {
    this.setState({ validate: true });
  }

  handleSelectChange = (e) => {
    var selectedUserType = e.value;
    this.setState({ selectedUserType: selectedUserType });
  }
  makeLowerCase(value) {
    if (value) {
      return value.toString().toLowerCase();
    }
    return "";
  }

  clickHandler = () => {
    // //=========TODO - Integrate email service code for OTP and use this code (DO NOT DELETE - VIJAY)
    // const { username, password, isValidLogin, requireOTP } = this.state;
    // if (
    //   !(
    //     (username === "guest" && password === "atos123") ||
    //     (username === "syntel" && password === "syntel123")
    //   )
    // ) {
    //   this.setState({ inavalidUser: true });
    // }
    // else {
    //   if (requireOTP === true){
    //     this.setState({ isValidLogin: true });
    //     const otp = document.getElementById("otp");
    //     if (isValidLogin) {
    //       if (otp !== null && otp.value !== "") {
    //         this.setState({ otperr: false });
    //         this.handleLogin();
    //       } else {
    //         this.setState({ otperr: true });
    //       }
    //     }
    //   }
    //   else{
    //     this.handleLogin();
    //   }
    // }

    const required = document.getElementsByClassName("required");
    if (required[0].value === "" || required[1].value === "") {
      this.setState({ inavalidUser: true });
    } else {
      this.handleLogin();
    }
  };

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to='/home'/>;
    // }

    return (
      <div id="root">
        <div className="App MyTransition--inViewport">
          <div className="rs-about relative pt-120 md-pt-80">
            <div className="container-fluid loginpage-bgimage">
              <div className="row y-middle loginDiv">
                {" "}
                {/* style={{backgroundImage: `url(${AutomationImage})`}} */}
                <div className="col-lg-6 md-mb-30"></div>
                <div className="col-lg-6 md-mb-30">
                  {/* <br />
                  <br />
                  <br />

                  <br />
                  <br /> */}
                  <div className="card float-right">
                    <div
                      className="card-body"
                      style={{ paddingBottom: "30px" }}
                    >
                      <h3
                        className="text-center  mb-4"
                        style={{ color: "#0066A2" }}
                      >
                        <span>
                          <img
                            src=''
                            alt='Library Management System'
                            className="logo"
                            style={{fontFamily:"initial",color:"antiquewhite", fontSize:"40px",fontWeight:"bold"
                            }}
                          />
                        </span>
                      </h3>
                      <div className="form-group">
                        {this.state.hasLoginFailed && (
                          <div className="alert alert-warning">
                            {/* Invalid Credentials */}
                            {this.state.errorMsg}
                          </div>
                        )}
                        {this.state.showSuccessMessage && (
                          <div>Login Sucessful</div>
                        )}

                        <i class="fa fa-user" aria-hidden="true" style={{float:"left",marginLeft: '30px', fontSize:'30px',color:'antiquewhite',paddingTop:'22px'}}></i>
                        <Input
                          autoComplete="off"
                          name="username"
                          labelName="Username: "
                          value={this.state.username}
                          placeholder="Username"
                          inputType="text"
                          className="form-control required"
                          parentFunction={this.handleChange}
                          //  onChange=
                        />

                      </div>
                      <br></br>
                      <div className="form-group">

                      <i class="fa fa-lock" aria-hidden="true" style={{float:"left",marginLeft: '30px', fontSize:'30px',color:'antiquewhite',paddingTop:'22px'}}></i>
                        <Input
                          autoComplete="off"
                          name="password"
                          labelName="Password: "
                          placeholder="Password"
                          inputType="password"
                          value={this.state.password}
                          className="form-control required"
                          parentFunction={this.handleChange}
                          keyPressEvent={this.KeyPress}
                        />
                        {/* User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /> */}
                      </div>
                      <br></br>
                      <div>
                      <i class='far fa-id-card' style={{float:"left",marginLeft: '30px', fontSize:'30px',color:'antiquewhite',paddingTop:'10px'}}></i>
                        <Select
                          options={this.state.options}
                          components={this.animatedComponents}
                          className="selectMenu selectType"
                          closeMenuOnSelect={true}
                          placeholder="Select Your Role"
                          onChange={this.handleSelectChange}
                          style={{ fontSize: "14px",backgroundColor:'transparent' }}
                        />
                        {/* <select
                          className="form-control"
                          value={this.state.value}
                          onChange={this.handleselectoptChange}
                        >
                          <option value="Atos">Atos</option>

                          <option value="Mavenwave">Mavenwave</option>
                        </select> */}
                        <br />
                      </div>
                      {this.state.inavalidUser ? (
                        <h6 style={{ color: "red" }}>
                          <i
                            className="fa fa-exclamation-circle"
                            aria-hidden="true"
                          ></i>{" "}
                          &nbsp;Invalid username or password
                        </h6>
                      ) : null}
                      <div>
                        <Link
                          onClick={this.handleforgotpwd}
                          className="float-right  forgotPwd"
                        >
                          Forgot Password..?
                        </Link>
                      </div>
                      <br/><br/>
                      <button
                        onClick={this.handleLogin}
                        type="submit"
                        className="btn  btn-block submitBtn float-right"
                      >
                        <span>Sign In</span>
                      </button>
                      {/* <p style={{float:"right", marginTop:"20px",fontSize:"18px"}}><a href="" onClick={this.handleforgotpwd}>Forgot Password..?</a></p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Modal
              show={this.state.forgotpwd}
              onHide={this.handleforgotpwdClose}
              className="resetpwd"
            >
              <Modal.Header style={{backgroundColor:"#6f2750"}} closeButton>
                <Modal.Title >Library Management System</Modal.Title>
              </Modal.Header>

              <Modal.Body
                style={{
                  display: "flex",
                  fontSize: "20px",
                }}
              >
                Please contact your administrator to reset the password.
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
