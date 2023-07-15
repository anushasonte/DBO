import React from "react";
import * as ReactBootStrap from "react-bootstrap";
// import Logo from "../../assets/images/syntbots-logo.png";
import User from "../../assets/UserProfile.png"
// import Notification from "../sidebar/Notification";
import { withRouter } from "react-router-dom";
import * as Constants from "../Constants";
import i18next from "i18next";
import { withTranslation } from "react-i18next";
import axios from "axios";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Profile from "../Profile/Profile";

class NavBar extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      username: "",
      organizationName: "Atos",
      tenantName: "Syntel",
      tenantType: "Org",
      selected: i18next.language.toUpperCase(),
      settings: {},
      environment: "Development",
      imgSrc: "",
      getuserdetails:{},
      viewuserdetail:false,
      itemToTransfer:{}
    };

    this.signOut = this.signOut.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getSettingsByTenant = this.getSettingsByTenant.bind(this);
    this.updateUserPreferedlanguage =
      this.updateUserPreferedlanguage.bind(this);
      this.handleViewUser=this.handleViewUser.bind(this);
      this.onEditClick=this.onEditClick.bind(this);

  }

  componentDidMount() {
    // var username = sessionStorage.getItem(
    //   Constants.USER_NAME_SESSION_ATTRIBUTE_NAME
    // );
    // this.setState({ username: username });

    // var organizationName = sessionStorage.getItem(
    //   Constants.USER_ORGANIZATION_NAME_SESSION_ATTRIBUTE_NAME
    // );
    // this.setState({ organizationName: organizationName });

    // var tenantName = sessionStorage.getItem(
    //   Constants.USER_TENANT_NAME_SESSION_ATTRIBUTE_NAME
    // );
    // this.setState({ tenantName: tenantName });

    // var tenantType = sessionStorage.getItem(
    //   Constants.USER_TENANT_TYPE_SESSION_ATTRIBUTE_NAME
    // );
    // this.setState({ tenantType: tenantType });
    this.getSettingsByTenant();
    // this.updateUserPreferedlanguage(username);
  }
  handleViewUser() {
    this.setState({viewuserdetail:true })
  }

//   updateUserPreferedlanguage(username) {
//     axios
//       .get(Constants.getuserdetail + "/" + username, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem(
//             // Constants.AUTH_SESSION_ATTRIBUTE_NAME
//           )}`,
//         },
//       })
//       .then((response) => {
//         //
//         // const userdata=response.data;
//         // var languageCode = languageCode
//         //   ? response.data.preferedlang
//         //   : this.state.settings.preferredLanguage;
//           // console.log("globalsettings"+this.state.settings.preferredLanguage)
//           sessionStorage.setItem(
//             Constants.GLOBAL_LANGUAGE_ID_SESSION_ATTRIBUTE_NAME,
//             this.state.settings.preferredLanguage
//           );
//        var  languageCode = response.data.preferedlang ? response.data.preferedlang : "US";
//         //
//         this.setState({getuserdetails:response.data });
//         // console.log("languageCode"+languageCode);
// //
//         // if (languageCode) {
//           this.setState({ selected: languageCode });
//           sessionStorage.setItem(
//             Constants.USER_LANGUAGE_ID_SESSION_ATTRIBUTE_NAME,
//             languageCode
//           );
//         // }
//         this.onSelect(languageCode);
//       });
//   }


//   getSettingsByTenant() {
//     const tenantid = sessionStorage.getItem(
//       Constants.USER_TENANT_ID_SESSION_ATTRIBUTE_NAME
//     );

//     this.itemService.getSettingsByTenant(tenantid).then((res) => {
//       const settings = res.data;
//       //
//       this.setState({ settings: settings });
//       let environment = "Development";
//       // console.log("environment: " + settings.environment);
//       if (settings) {
//         if (settings.environment === "TEST") {
//           environment = "Test";
//         } else if (settings.environment === "PROD") {
//           environment = "Production";
//         } else if (settings.environment === "PREPROD") {
//           environment = "Pre-Production";
//         } else {
//           environment = "Development";
//         }
//       }

//       this.setState({ environment: environment });
//       var username = sessionStorage.getItem(
//         Constants.USER_NAME_SESSION_ATTRIBUTE_NAME
//       );

//       const languageCode = sessionStorage.getItem(
//         Constants.USER_LANGUAGE_ID_SESSION_ATTRIBUTE_NAME
//       );

//       if (languageCode === "") {
//         this.updateUserPreferedlanguage(username);
//       }
//       // console.log("this.state.settings: ", this.state.settings);
//     });

//     axios
//       .get(Constants.getImageByTenant + "?tenantid=" + tenantid, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem(
//             Constants.AUTH_SESSION_ATTRIBUTE_NAME
//           )}`,
//         },
//       })
//       .then((response) => {
//         // const data = `data:${response.headers['content-type']};base64,${new Buffer(response.data).toString('base64')}`;
//         //this.setState({ imgSrc: data });
//         // document.getElementById('imgIcon').src = data;
//         // console.log("data= " + data);
// //
//         const byteCharacters = atob(response.data);
//         const byteNumbers = new Array(byteCharacters.length);
//         for (let i = 0; i < byteCharacters.length; i++) {
//           byteNumbers[i] = byteCharacters.charCodeAt(i);
//         }
//         const byteArray = new Uint8Array(byteNumbers);

//         let image = new Blob([byteArray], { type: "image/jpeg" });
//         let imageUrl = URL.createObjectURL(image);
//         this.setState({ imgSrc: imageUrl });
//       });
//   }

  onSelect(languageCode) {
    //
    this.setState({ selected: languageCode });
    // sessionStorage.setItem(
    //   Constants.USER_LANGUAGE_ID_SESSION_ATTRIBUTE_NAME,
    //   languageCode
    // );
    i18next.changeLanguage(languageCode.toLowerCase());
  }

  signOut() {
    // sessionStorage.removeItem(Constants.USER_NAME_SESSION_ATTRIBUTE_NAME);
    // sessionStorage.removeItem(Constants.USER_ROLE_SESSION_ATTRIBUTE_NAME);
    // sessionStorage.removeItem(
    //   Constants.USER_ORGANIZATION_NAME_SESSION_ATTRIBUTE_NAME
    // );
    // sessionStorage.removeItem(
    //   Constants.USER_TENANT_NAME_SESSION_ATTRIBUTE_NAME
    // );
    // sessionStorage.removeItem(
    //   Constants.USER_TENANT_TYPE_SESSION_ATTRIBUTE_NAME
    // );
    // sessionStorage.removeItem(Constants.USER_TENANT_ID_SESSION_ATTRIBUTE_NAME);
    // sessionStorage.removeItem(Constants.AUTH_SESSION_ATTRIBUTE_NAME);
    // sessionStorage.removeItem(
    //   Constants.USER_LANGUAGE_ID_SESSION_ATTRIBUTE_NAME
    // );
    localStorage.clear();
    this.props.history.push("/");
  }
  onEditClick = (item) => {
    let isPasswordShown = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
    this.setState({ itemToTransfer: item,viewuserdetail:true})
//
  }

  render() {
    const { t } = this.props;
    return (
      <div>
      {/* {this.state.viewuserdetail === true ? (
        <>

          <Profile
            getuserdetails={this.state.getuserdetails}
            updateUserPreferedlanguage={this.updateUserPreferedlanguage}
            itemToTransfer={this.state.itemToTransfer}
          />
        </>
      ) : ( */}
      <div>
        <ReactBootStrap.Navbar collapseOnSelect expand="xl" color="white">
          <ReactBootStrap.Navbar.Brand href="/dashboard">
            <img src='' alt="logo" className="mt-1"/>
            </ReactBootStrap.Navbar.Brand>

            {/* <h4
              style={{
                paddingLeft: "10px",
                marginTop: "6px",
                textTransform: "none",
              }}
            >
              SyntBots 2.0
            </h4> */}
						<ReactBootStrap.Navbar.Brand className="text-center logoDivWidth">
							<div>
								<img
									id="imgIcon"
									src={this.state.imgSrc}
									// src={ Constants.getImageByTenant + "?tenantId=" + sessionStorage.getItem(Constants.USER_TENANT_ID_SESSION_ATTRIBUTE_NAME) }
									alt=""
								/>
								&nbsp;&nbsp;&nbsp;
								<b className="logoName">
									{" "}
									{this.state.settings.title}
								</b>
								<span className="envText">(Env: {this.state.environment})</span>
							</div>
            </ReactBootStrap.Navbar.Brand>

          <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
            <ReactBootStrap.Nav className="mr-auto"></ReactBootStrap.Nav>
            <ReactBootStrap.Nav>
              {/* <ReactBootStrap.Nav.Link
                eventKey={1}
                title="Notifications"
                className="pt-1"
              >
                <Notification />
              </ReactBootStrap.Nav.Link> */}

              <ReactBootStrap.Nav.Link
                eventKey={2}
                title="Profile"
                className="p-0 mt-0"
              >
                <ReactBootStrap.NavDropdown
                  title={
                    <>
                      <img src={User} alt="Profile User" className="navBarIcons"/>
                    </>
                  }
                  id="navbarScrollingDropdown"
                  className="profile"
                >
                   <p className="text-captialize mb-0 ml-2 font-weight-bold">{this.state.username}</p>
                   <ReactBootStrap.NavDropdown.Divider />
                  <ReactBootStrap.NavDropdown.Item href="#action3" className="profile-menu">
                  <small
                    className="font-weight-bold notification-header"
                    style={{ color: "#005999" }}
                  >
                    <Link to="/profile">
                      <Button className="no-bg" variants='primary' onClick={() => this.onEditClick(this.state.getuserdetails)}><u>My Profile</u></Button>
                    </Link>
                    {/* {this.state.username} */}
                  </small>
                  </ReactBootStrap.NavDropdown.Item>

                  <ReactBootStrap.NavDropdown.Divider />
                  <ReactBootStrap.NavDropdown.Item>
                    <small className="notification-detail">
                      {t("Login.lbl_tenant")}
                    </small>{" "}
                    :
                    <span className="notification-detail font-weight-bold">
                      &nbsp;{this.state.tenantName}
                    </span>
                  </ReactBootStrap.NavDropdown.Item>
                  {/* {this.state.tenantType === "Tenant" ? (
                    <ReactBootStrap.NavDropdown.Item href="#action4">
                      <small className="notification-detail">
                        {t("Login.lbl_tenant")}
                      </small>{" "}
                      :{" "}
                      <span className="notification-detail font-weight-bold">
                        {this.state.tenantName}
                      </span>
                    </ReactBootStrap.NavDropdown.Item>
                  ) : (
                    ""
                  )} */}
                  <ReactBootStrap.NavDropdown.Divider />
                  <ReactBootStrap.NavDropdown.Item
                    href="#action5"
                    onClick={this.signOut}
                  >
                    <small className="notification-detail">
                      <i className="fa fa-power-off"></i>&nbsp;
                      {t("Login.lbl_sign_out")}
                    </small>
                  </ReactBootStrap.NavDropdown.Item>
                </ReactBootStrap.NavDropdown>
              </ReactBootStrap.Nav.Link>


            </ReactBootStrap.Nav>
          </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>

      </div>
      {/* )
              } */}
              </div>
    );
  }
}

export default withTranslation("common")(withRouter(NavBar));
