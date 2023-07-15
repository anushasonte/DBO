import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import * as Constants from "../Constants";
import axios from "axios";
import "../MemberDocuments/MemberDocuments.css";
import 'mdb-ui-kit/css/mdb.min.css';
// import logo from "../assets/logo.jpg"
import logo from "../../assets/bookslogo.jpeg"
import { FaDesktop, FaCheckCircle, FaCircle, FaDocker } from "react-icons/fa";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@mui/material/Tooltip';
// const useStyles = makeStyles({
//     table: {
//       minWidth: 650
//     }
//   });
// const classes = useStyles();

class MemberDocuments extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
            searcheditems:[],
            searched:'',
			DataisLoaded: false,
      adddocument:false,
      id: 0,
      docid: '',
      doc_id:'',
      doc_category: '',
      doc_room_number: 0,
      doc_room_level: 0,
      doc_rack_number: 0,
      doc_rack_level: 0,
      doc_isdigitalversion: '',
      doc_isissuedby: null,
      doc_borrowedby: null,
      doc_issuedtimestamp: null,
      doc_totalnoofcopies: 0,
      doc_noofcopiesavailable: 0,
      doc_lastmodifiedtimestamp: null,
      showAddUserPopup:false,
      showupdate:false,

      getdocuments:[],
      alldocuments:[],
      showeditform:false,
      editDataTransfer:{},
      itemToTransfer: [],
      TransferredItem: [],
      showupdate: false,
      borrowerdata:[],
      bookdata:[],
      pastduedatenotify:false,
      test: [],
      docInfo: new Map(),
		};
    this.signOut = this.signOut.bind(this);
    // this.booksbyid = this.booksbyid.bind(this);
	}
  handledocClose = () => {
    this.setState({ adddocument: false });
  }
  componentDidMount() {
    this.getalldocuments().then(() => {
      var p0 = this.borrowersbyid();
      var p1 = this.booksbyid();
      var p2 = this.journalbyid();
      var p3 = this.magazinebyid();
      var p4= this.thesisbyid();
      Promise.all([p0, p1, p2, p3,p4]).then(() => {
        this.alldocuments();
      });
    });
  }
	// ComponentDidMount is used to
	// execute the code
	getalldocuments() {
    return  fetch(Constants.getalldocuments,
      { headers: {
       "Access-Control-Allow-Origin": "*",
       'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
      }})
			.then((res) => res.json())
			.then((json) => {
        debugger;
        for (let i=0; i<json.length;i++){
          this.state.docInfo.set(json[i].docid, json[i]);
        }
				this.setState({
					items: json,
          searcheditems:json,
					DataisLoaded: true
				});
			})
	}


  borrowdocument = async(docid) => {
    debugger;
    this.setState({ show: true});
    let id = parseInt(docid, 10);

    let u_id = sessionStorage.getItem(Constants.USERID)
    const requestOptions = {
      method: 'DELETE',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
      }

};
  axios
    .put(
      Constants.borrowdocuments + `/${docid}`+`/${u_id}`,{},

      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
        }
      }
    ).then(res =>{
      debugger;
      if(res.status==200){
        toast.success("DOCUMENT borrowed successfully!", {
          containerId: "A",
        });

        setTimeout(function () {
          window.location.reload(false);

      }, 1000);

      }
      return res;
  })

  };

  returndocument = async(docid) => {
    debugger;
    this.setState({ show: true});
    let id = parseInt(docid, 10);

    let u_id = sessionStorage.getItem(Constants.USERID)
    const requestOptions = {
      method: 'DELETE',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
      }

};
  axios
    .put(
      Constants.returndocuments + `/${docid}`+`/${u_id}`,{},
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
        }
      }
    ).then(res =>{
      debugger;
      if(res.status==200){
        toast.success("DOCUMENT returned successfully!", {
          containerId: "A",
        });

        setTimeout(function () {
          window.location.reload(false);

      }, 1000);

      }
      return res;
  })
  .catch((error) => {
      toast.error("DOCUMENT was not borrowed by you.!!", {
        containerId: "A",
      });

  })

  };

  requestSearch = (searchedVal) => {
        const filteredRows = this.state.items.filter((item) => {
          return item.doc_category.toLowerCase().includes(searchedVal.toLowerCase()) ||
          item.author.toLowerCase().includes(searchedVal.toLowerCase()) ||
          item.title.toLowerCase().includes(searchedVal.toLowerCase())
        });
        this.setState({searcheditems: filteredRows});
      };

      alldocuments (){
        for (let i=0;i<this.state.items.length;i++){
            var temp=this.state.items[i];
            temp.title=this.state.docInfo.get(temp.docid).title;
            temp.author=this.state.docInfo.get(temp.docid).author;
        }
        this.setState({docInfo: this.state.docInfo});
      }

      cancelSearch = () => {
        this.setState({searched:''});
        this.requestSearch(this.state.searched);
      };

      clearData = () => {
        this.setState({doc_category: "", doc_isdigitalversion: ""})
      }
      hideAddUserPopup = () => {

        this.setState({showAddUserPopup: false});
        this.clearData();
      }
      handleChange = (e) => {
        let input = e.target;
        let name = e.target.name;
        let value = input.value;
        this.setState({
          [name]: value,
        });
      };


      handleEditChange = (e) => {
        let { value, name } = e.target;
        this.state.items[name] = value;

      };

      borrowersbyid = () => {
        let u_id = sessionStorage.getItem(Constants.USERID)
        return  fetch(Constants.borrows + `/${u_id}`,
          { headers: {
           "Access-Control-Allow-Origin": "*",
           'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
          }})
          .then((res) => res.json())
          .then((json) => {
            for(let i=0;i<json.length;i++){
              let t = json[i];
              let today = new Date();
              t.issuedate = new Date(Date.parse(t.borrowtime));

              t.expiredate = new Date(Date.parse(t.borrowtime));
              t.expiredate.setDate(t.issuedate.getDate() + 7);
              t.expiredate = new Date(t.expiredate)

              var temp = this.state.docInfo.get(t.docid);
              console.log(this.state.docInfo.get(t.docid));
              temp.expired = false;
              if (today > t.expiredate){
                temp.expired = true;
              }
              temp.expiredate = t.expiredate.toDateString();
              temp.issuedate = t.issuedate.toDateString();
            }
            this.setState({docInfo: this.state.docInfo});
          })
          .catch((error) => {
            console.log(error);
            toast.error(error, {
              containerId: "A",
            });
          });
      }

      booksbyid() {
        return  fetch(Constants.bookauthors,
          { headers: {
           "Access-Control-Allow-Origin": "*",
           'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
          }})
          .then((res) => res.json())
          .then((json) => {
            for(let i=0;i<json.length;i++){
              let t = json[i];
              var temp = this.state.docInfo.get(t.docid);
              if (temp === undefined){
                continue;
              }
              temp.title = t.b_title;
              temp.author = t.b_author;
            }
            this.setState({docInfo: this.state.docInfo});
          })
      }
      journalbyid() {
        return  fetch(Constants.journalauthors,
          { headers: {
           "Access-Control-Allow-Origin": "*",
           'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
          }})
          .then((res) => res.json())
          .then((json) => {
            for(let i=0;i<json.length;i++){
              let t = json[i];
              var temp = this.state.docInfo.get(t.docid);
              if (temp === undefined){
                continue;
              }
              temp.title = t.j_name;
              temp.author = t.j_author;
            }
            this.setState({docInfo: this.state.docInfo});
          })
      }

      magazinebyid() {
        return  fetch(Constants.magazineauthors,
          { headers: {
           "Access-Control-Allow-Origin": "*",
           'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
          }})
          .then((res) => res.json())
          .then((json) => {
            for(let i=0;i<json.length;i++){
              let t = json[i];
              var temp = this.state.docInfo.get(t.docid);
              if (temp === undefined){
                continue;
              }
              temp.title = t.m_name;
              temp.author = t.m_contributor;
            }
            this.setState({docInfo: this.state.docInfo});
          })
      }
      thesisbyid() {
        return  fetch(Constants.thesisauthors,
          { headers: {
           "Access-Control-Allow-Origin": "*",
           'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
          }})
          .then((res) => res.json())
          .then((json) => {
            for(let i=0;i<json.length;i++){
              let t = json[i];
              var temp = this.state.docInfo.get(t.docid);
              if (temp === undefined){
                continue;
              }
              temp.title = t.t_name;
              temp.author = t.t_author;
            }
            this.setState({docInfo: this.state.docInfo});
          })
      }
      onEditClick = (item) => {
        // this.setState({itemToTransfer:[]});

        this.setState({ itemToTransfer: item, editClicked: true,  showupdate: true})
      }
      submitTransferedData = (event) => {
        event.preventDefault();
        let TransferredItem = [...this.state.items];
        const Transferreditem = Array.prototype.slice
          .call(event.target)
          .filter((el) => el.name)
          .reduce(
            (form, el) => ({
              ...form,
              [el.name]: el.value,
            }),
            {}
          );
        const data = this.state.itemToTransfer;
      };

      handleUpdateClose = () => {
        this.setState({ showupdate: false });
        this.clearData();
      }
      signOut() {
        sessionStorage.removeItem(Constants.AUTH);

        sessionStorage.clear();
        this.props.history.push("/login");
      }
	render() {


		const { DataisLoaded, items,searcheditems } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Pleses wait some time.... </h1> </div> ;

		return (
		<div className = "App">

                  <div className="container-fluid docpage-bgimage"></div>
<div className="content">
<ToastContainer containerId={"A"} position={toast.POSITION.BOTTOM_RIGHT} />

			{/* <h1> Library Management System </h1> */}

            {/* <p>
  <mat-toolbar color="primary">
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
      <mat-icon>menu</mat-icon>
    </button>
    <span>My App</span>
    <span class="example-spacer" style={{flex: "1,1,auto"}}></span>
    <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
      <mat-icon>favorite</mat-icon>
    </button>
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
      <mat-icon>share</mat-icon>
    </button>
  </mat-toolbar>
</p> */}

{/* <Navbar></Navbar> */}
<nav class="navbar navbar-expand-lg "  style={{backgroundColor:"antiquewhite"}}>

  <div class="container-fluid">

    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>


    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src={logo}
          height="50"
          alt="LMS Logo"
          loading="lazy"

        />
      </a>

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#"  style={{color:"#983132",fontSize:"25px",fontFamily:"initial",fontWeight:"bold"}}>Member Dashboard</a>
        </li>
        {/* <li class="nav-item">
          <a class="nav-link" href="#">Team</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Projects</a>
        </li> */}
      </ul>

    </div>



    <div class="d-flex align-items-center">

      <a class="text-reset me-3" href="#">
        <i class="fas fa-shopping-cart"></i>
      </a>

      <div class="dropdown">
        <a
          class="text-reset me-3 dropdown-toggle hidden-arrow"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fas fa-bell"></i>
          <span class="badge rounded-pill badge-notification bg-danger">1</span>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <li>
            <a class="dropdown-item" href="#">Some news</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Another news</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
      </div>

      <div class="dropdown">
      <Button  style={{backgroundColor:"antiquewhite"}} onClick={this.signOut}>
        {/* <span className="button_icon">
                  <i className="fa fa-power-off">&nbsp;</i>{" "}
                </span> */}

          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            class="rounded-circle"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
      </Button>

      </div>
    </div>

  </div>

</nav>
<br></br>

              <br></br>
              <br></br>

              <br></br>

<Paper style={{width:"100%"}}>
        <SearchBar
          value={this.state.searched}
          onChange={(searchVal) => this.requestSearch(searchVal)}
          onCancelSearch={() => this.cancelSearch()}
          style={{backgroundColor:"antiquewhite"}}
          placeholder="Search for documents and more"
        />

        <TableContainer style={{backgroundColor:"antiquewhite"}}>
          <Table  aria-label="simple table">
            <TableHead style={{backgroundColor:"#983132"}}>
              <TableRow>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}}>ID</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial",width:"13%"}}>Title</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial",width:"10%"}}>Author</TableCell>

                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center">Category</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial",width:"3%"}} align="center">Room Number</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial",width:"3%"}} align="center">Room Level</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial",width:"3%"}} align="center">Rack Number</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial",width:"3%"}} align="center">Total Copies</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial",width:"3%"}} align="center">Available Copies</TableCell>

                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial",width:"3%"}} align="center">Digital Version</TableCell>

                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial",width:"10%"}} align="center">Borrow &nbsp;| &nbsp;Return</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center">Issue Date</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center">Due Date</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center"><i class='fas fa-bell'></i></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {searcheditems.map((item) => (
                <TableRow key={item.docid}>
                  <TableCell style={{fontSize:"18px",fontFamily:"initial"}} component="th" scope="row">
                    {item.docid}
                  </TableCell>

                  <TableCell style={{fontSize:"18px",fontFamily:"initial"}} component="th" scope="row">
                  {item.title}

                  {/* {console.log(this.state.bookdata)} */}
                  </TableCell>
                  <TableCell style={{fontSize:"18px",fontFamily:"initial"}} component="th" scope="row">
                  {item.author}

                  {/* {this.state.bookdata.docid} */}
                  </TableCell>
                  <TableCell style={{fontSize:"18px",fontFamily:"initial"}} align="center">{item.doc_category}</TableCell>
                  <TableCell style={{fontSize:"18px",fontFamily:"initial"}} align="center">{item.doc_room_number}</TableCell>
                  <TableCell style={{fontSize:"18px",fontFamily:"initial"}} align="center">{item.doc_room_level}</TableCell>
                  <TableCell style={{fontSize:"18px",fontFamily:"initial"}} align="center">{item.doc_rack_number}</TableCell>
                  <TableCell style={{fontSize:"18px",fontFamily:"initial"}} align="center">{item.doc_totalnoofcopies}</TableCell>
                  <TableCell style={{fontSize:"18px",fontFamily:"initial"}} align="center">{item.doc_noofcopiesavailable}</TableCell>

                  <TableCell align="center">
                  {item.doc_isdigitalversion === "Y" ? (
                              <span className="fontSize16 statusMachine">
                                <FaCheckCircle
                                  style={{ color: "green" }}
                                  title="Online"
                                  className="fa-icon"
                                  size="25"
                                />{" "}
                              </span>
                            ) : (
                              <span className="fontSize16 statusMachine">
                                {/* <FaCircle
                                  style={{ color: "red" }}
                                  title="Online"
                                  className="fa-icon"
                                  size="25"
                                />{" "} */}
                                <i class="fa fa-times-circle" aria-hidden="true"  style={{ color: "red" ,fontSize:"25px"}}></i>
                              </span>
                            )}
                  </TableCell>
                  <TableCell align="center">

                  {/* {<i class="fa fa-plus-square" aria-hidden="true" style={{ color: "green" ,fontSize:"25px"}}></i>}
                  &nbsp; &nbsp;
                  |  &nbsp; &nbsp; */}

{/* <Button size="sm" color="primary" tag={Link} to={"/documents/" + item.docid}>Edit</Button> */}
<Tooltip title="Borrow Document">
<Link
              style={{ border: "none", color: "#983132" }}
              to="#"
              onClick={() =>
                this.borrowdocument(item.docid)
              }
            >
              <span className="ml-1">

              <i class="fa fa-book" aria-hidden="true" style={{ color: "#983132" ,fontSize:"25px"}}></i>  </span>
              </Link>
              </Tooltip>


{/* {                  <i class="fa fa-pencil-square" aria-hidden="true" style={{ color: "orange" ,fontSize:"25px"}}></i>
}           */}
  &nbsp; &nbsp;
  |
   &nbsp; &nbsp;
   <Tooltip title="Return Document">

<Link
              style={{ border: "none", color: "#007ebd" }}
              to="#"
              onClick={() =>
                this.returndocument(item.docid)
              }
            >
              <span className="ml-1">
              <i class="fa fa-reply" aria-hidden="true" style={{ color: "#983132" ,fontSize:"25px"}}></i>
       </span>
              </Link>

              </Tooltip>


                  </TableCell>
                  <TableCell style={{fontSize:"18px",fontFamily:"initial"}} align="center">
                    {!this.state.docInfo.get(item.docid).hasOwnProperty('issuedate')  ?
                      "-"
                    :
                   <span> {this.state.docInfo.get(item.docid).issuedate}</span>
                    }
                  </TableCell>
                  <TableCell style={{fontSize:"18px",fontFamily:"initial"}} align="center">
                    {!this.state.docInfo.get(item.docid).hasOwnProperty('expiredate') ? "-": <span>{this.state.docInfo.get(item.docid).expiredate}</span> }
                  </TableCell>
                  <TableCell align="center">
                  {!this.state.docInfo.get(item.docid).hasOwnProperty('expired') ? "-" : <span>
                  {this.state.docInfo.get(item.docid).expired === true ? (
                              <span className="fontSize16 statusMachine">
                             <i class='fas fa-exclamation-triangle' style={{ color: "red" ,fontSize:"25px"}}></i>
                             <br></br>
                            <p style={{ color: "red" }}> Past Due Date </p>
                              </span>
                            ) : (
                              <span className="fontSize16 statusMachine">
                                {/* <FaCircle
                                  style={{ color: "red" }}
                                  title="Online"
                                  className="fa-icon"
                                  size="25"
                                />{" "} */}

<i class="fa fa-comment" style={{ color: "orange" ,fontSize:"25px"}}></i>
<br></br>
<p style={{ color: "orange" }}>Due Date Is Coming</p>

                              </span>
                            )}
                            </span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>







{/* Edit Starts below */}



    </div>
      </div>


	);
}
}

export default MemberDocuments;
