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
import * as Constants from "./Constants";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";
import "../Components/documents.css";
import 'mdb-ui-kit/css/mdb.min.css';
// import logo from "../assets/logo.jpg"
import logo from "../assets/bookslogo.jpeg"
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

class Documents extends React.Component {

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
    TransferredItem: [],      showupdate: false,
    test: [],      docInfo: new Map()



		};
    this.signOut = this.signOut.bind(this);

	}
  handledocClose = () => {
    this.setState({ adddocument: false });
  }
  componentDidMount() {
    this.getalldocuments();

    this.getalldocuments().then(() => {
      var p1 = this.booksbyid();
      var p2 = this.journalbyid();
      var p3 = this.magazinebyid();
      var p4= this.thesisbyid();

      Promise.all([ p1, p2, p3,p4]).then(() => {
        this.alldocuments();
      });
    });
  }
	// ComponentDidMount is used to
	// execute the code
	getalldocuments() {
    // axios
    // .get( Constants.getalldocuments, {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
    //   }


    // })

    return  fetch(Constants.getalldocuments,
      { headers: {
       "Access-Control-Allow-Origin": "*",
       'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
      }})


			.then((res) => res.json())
			.then((json) => {
        for (let i=0; i<json.length;i++){
          this.state.docInfo.set(json[i].docid, json[i]);
        }
        debugger;
				this.setState({
					items: json,
                    searcheditems:json,
					DataisLoaded: true
				});
			})
	}

 updatedocument = async(docid) => {

    debugger;
    this.setState({ show: true});
    let id = parseInt(docid, 10);
console.log(docid);
const requestOptions = {
  method: 'PUT',
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
  }

};

const document ={
  "id": 1,
  "docid": "1",
  "doc_category": "journal",
  "doc_room_number": 101,
  "doc_room_level": 205,
  "doc_rack_number": 1,
  "doc_rack_level": 1,
  "doc_isdigitalversion": "Y",
  "doc_isissuedby": null,
  "doc_borrowedby": null,
  "doc_issuedtimestamp": null,
  "doc_totalnoofcopies": 5,
  "doc_noofcopiesavailable": 3,
  "doc_lastmodifiedtimestamp": null
};
// return  fetch(Constants.getdocumentsbyid + `/${id}`,document,
// requestOptions
// )
//   .then((res) => res.json())
//   .then((json) => {
//     debugger;
//    })
  axios
    .put(
      Constants.getdocumentsbyid + `/${id}` ,document,

      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
        }
      }
    ).then(res =>{
      debugger;
      return res;
  })
      // .catch(this.handleError);

//     if (saveResult.status === 200) {
// debugger;
//       // this.setState({ logs: flowlogs, show: true,hasError:false });
//       if(this.state.logs === undefined){
//         this.setState({ hasError: true});

//       }
//       this.setState({ loading: false});
//     } else {
//       this.setState({ show: false});
//       this.setState({ loading: false});
//       toast.error("No Data Available !", {
//         containerId: "A",
//       });
//     }
  };
  deletedocument = async(docid) => {

    debugger;
    this.setState({ show: true});
    let id = parseInt(docid, 10);
console.log(docid);
const requestOptions = {
  method: 'DELETE',
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
  }

};
  axios
    .delete(
      Constants.deletedocumentsbyid + `/${docid}`,

      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
        }
      }
    ).then(res =>{
      debugger;
      if(res.status==200){
        toast.info("DOCUMENT deleted successfully!", {
          containerId: "A",
        });

        setTimeout(function () {
          window.location.reload(false);

      }, 1000);

      }
      return res;


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

      onSubmit = (e) => {
        e.preventDefault();
        let doc_id=this.state.doc_id;
        let doc_category = this.state.doc_category;
        let doc_isdigitalversion = this.state.doc_isdigitalversion;
        let doc_room_number = this.state.doc_room_number;
        let doc_room_level = this.state.doc_room_level;
        let doc_rack_number = this.state.doc_rack_number;
        let doc_rack_level = this.state.doc_rack_level;
        let doc_totalnoofcopies = this.state.doc_totalnoofcopies;
        let doc_noofcopiesavailable = this.state.doc_noofcopiesavailable;
let data={
  docid:doc_id,
  doc_category:doc_category,
  doc_isdigitalversion:doc_isdigitalversion,
  doc_room_number:doc_room_number,
  doc_room_level:doc_room_level,
  doc_rack_number:doc_rack_number,
  doc_rack_level:doc_rack_level,
  doc_totalnoofcopies:doc_totalnoofcopies,
  doc_noofcopiesavailable:doc_noofcopiesavailable
}
debugger;
        axios
        .post(
          Constants.adddocument ,data,

          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
            }
          }
        )

          .then((res) => {
debugger;
if (res.status ==  200){
            toast.success("Document Added successfully!", {
              containerId: "A",
            });
            this.setState({showAddUserPopup: false, showupdate:false});

            this.getData();
          }

    else{

            toast.error("Invalid Data!", {
              containerId: "A",
            });
          }
          this.setState({showAddUserPopup: false, showupdate:false});
          this.clearData();
        })

      }

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





      onEdit = (e, data) => {
        if(e) {
          e.preventDefault();
        }

        let TransferredItem = [...this.state.items];
        const Transferreditem = Array.prototype.slice
          .call(e.target || data.target)
          .filter((el) => el.name)
          .reduce(
            (form, el) => ({
              ...form,
              [el.name]: el.value,
            }),
            {}
          );

        TransferredItem.push(Transferreditem);
        this.setState({
          TransferredItem,
        });


        Transferreditem.doc_id = Transferreditem.doc_id;
        let doc_id = Transferreditem.doc_id;
        let doc_category = Transferreditem.doc_category;
        let doc_isdigitalversion = Transferreditem.doc_isdigitalversion;
        let doc_room_number = Transferreditem.doc_room_number;
        let doc_room_level = Transferreditem.doc_room_level;
        let doc_rack_number = Transferreditem.doc_rack_number ;
        // let password = Transferreditem.password;
        let doc_rack_level = Transferreditem.doc_rack_level;
        let doc_totalnoofcopies = Transferreditem.doc_totalnoofcopies;
        let doc_noofcopiesavailable = Transferreditem.doc_noofcopiesavailable;

        let inputdata={
          docid:doc_id,
          doc_category:doc_category,
          doc_isdigitalversion:doc_isdigitalversion,
          doc_room_number:doc_room_number,
          doc_room_level:doc_room_level,
          doc_rack_number:doc_rack_number,
          doc_rack_level:doc_rack_level,
          doc_totalnoofcopies:doc_totalnoofcopies,
          doc_noofcopiesavailable:doc_noofcopiesavailable
        }
       axios
            .put(
              Constants.updatedocumentsbyid + `/${doc_id}`,inputdata,

              {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
                }
              }
            )
            .then((res) => {

              if(res.status == 200){
              toast.success("Document Updated successfully!", {
                containerId: "A",
              });
              setTimeout(function () {
                window.location.reload(false);

            }, 1000);
              // this.setState({showupdate: false})
              this.getData();
            }else{
              toast.error("Document Update Failed!", {
                containerId: "A",
              });
            }
            })


        // this.getData();
        // else {
        //   // Do nothing!
        //   toast.error("User Update Failed!", {
        //     containerId: "A",
        //   });
        // }
      }
      handleEditChange = (e) => {
        let { value, name } = e.target;
        this.state.items[name] = value;

      };
      getdocumentsbyid = (docid) => {
        axios
          .get(Constants.getdocumentsbyid + `/${docid}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem(
                Constants.AUTH
              )}`,
            },
          })
          .then((response) => {
            // this.setState({ items: response.data });
            this.setState({ itemToTransfer: response.data });
          })
          .catch((error) => {
            // console.log(error);
            toast.error("API Call Failed!", {
              containerId: "A",
            });
          });
      }
      // onSubmitedit = (e) => {
      //   e.preventDefault();
      //   this.onEdit(this.state.editDataTransfer);
      // }

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
	render() {
    const alldocuments = this.state.getdocumentsbyid;
    const test = this.state.itemToTransfer;

		const { DataisLoaded, items,searcheditems } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Pleses wait some time.... </h1> </div> ;

		return (
		<div className = "App">

                  <div className="container-fluid docpage-bgimage"></div>
<div className="content">
<ToastContainer containerId={"A"} position={toast.POSITION.TOP_RIGHT} />

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
          <a class="nav-link" href="#" style={{color:"#983132",fontSize:"25px",fontFamily:"initial",fontWeight:"bold"}}>Librarian Dashboard</a>
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
<Button style={{backgroundColor:"#983132",color:"antiquewhite",float:"right",marginRight:"6%",height:"50px"}} type="submit" onClick={(e) => this.setState({showAddUserPopup: true})}>
                <span className="button_icon">
                  <i className="fa fa-plus">&nbsp;</i>Add Document{" "}
                </span>
              </Button>
              <br></br>
              <br></br>

              <br></br>

<Paper style={{width:"90%",marginLeft:"5%"}}>
        <SearchBar
          value={this.state.searched}
          onChange={(searchVal) => this.requestSearch(searchVal)}
          onCancelSearch={() => this.cancelSearch()}
          style={{backgroundColor:"antiquewhite"}}
        />

        <TableContainer style={{backgroundColor:"antiquewhite"}}>
          <Table  aria-label="simple table">
            <TableHead style={{backgroundColor:"#983132"}}>
              <TableRow>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}}>ID</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}}>Title</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}}>Author</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center">Category</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center">Room Number</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center">Room Level</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center">Rack Number</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center">Total Copies</TableCell>
                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center">Available Copies</TableCell>

                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center">Digital Version</TableCell>

                <TableCell style={{color:"antiquewhite",fontSize:"20px",fontFamily:"initial"}} align="center">User Actions</TableCell>

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
<Tooltip title="Update Document/Copy Details">

<Link
              style={{ border: "none", color: "#007ebd" }}
              to="#"
              onClick={() =>
                this.onEditClick(item)

              }
            >
              <span className="ml-1">
              <i class="fa fa-pencil-square" aria-hidden="true" style={{ color: "orange" ,fontSize:"25px"}}></i>      </span>
              </Link>
              </Tooltip>

{/* {                  <i class="fa fa-pencil-square" aria-hidden="true" style={{ color: "orange" ,fontSize:"25px"}}></i>
}           */}
  &nbsp; &nbsp;
  |
   &nbsp; &nbsp;
   <Tooltip title="Remove Document">

<Link
              style={{ border: "none", color: "#007ebd" }}
              to="#"
              onClick={() =>
                this.deletedocument(item.docid)
              }
            >
              <span className="ml-1">
              <i class="fa fa-trash" aria-hidden="true" style={{ color: "red" ,fontSize:"25px"}}></i>        </span>
              </Link>
              </Tooltip>

                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal
              show={this.state.showAddUserPopup}
              onHide={this.hideAddUserPopup}
              style={{
                display: "flex",
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{fontFamily:"initial",fontSize:"35px"}}>Add Document</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={(e) => this.onSubmit(e)}>
                  <div className="modal-body mx-3">
                    <div className="rowclass">
                      <div className="form-row" style={{ marginLeft: "11px", marginRight: "11px" }}>
                      <div className="form-group col-md-6" style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_id"
                            style={{
                              float: "left",
                              color: "dark-black",
                              paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px"
                            }}
                          >
                           Document ID {" "}
                          </label>
                          <input
                            className="form-control"
                            id="doc_id"
                            type="text"
                            name="doc_id"
                            defaultValue={this.state.doc_id}
                            onChange={this.handleChange}
                            maxLength="15"
                            required
                          />
                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_category"
                            style={{
                              float: "left",
                              color: "dark-black",
                              paddingRight: "10px",
                               width: "50%",fontFamily:"initial",fontSize:"18px"
                            }}
                          >
                         Category   {" "}
                          </label>
                          <input
                            className="form-control"
                            id="doc_category"
                            type="text"
                            name="doc_category"
                            defaultValue={this.state.doc_category}
                            onChange={this.handleChange}
                            maxLength="15"
                            required
                          />
                        </div>
                        <div className="form-group col-md-6" style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_id"
                            style={{
                              float: "left",
                              color: "dark-black",
                              paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px"
                            }}
                          >
                          Title {" "}
                          </label>
                          <input
                            className="form-control"
                            id="doc_id"
                            type="text"
                            name="doc_id"

                            maxLength="15"
                            required
                          />
                        </div>

                        <div className="form-group col-md-6" style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_id"
                            style={{
                              float: "left",
                              color: "dark-black",
                              paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px"
                            }}
                          >
                           Author {" "}
                          </label>
                          <input
                            className="form-control"
                            id="doc_id"
                            type="text"
                            name="doc_id"

                            maxLength="15"
                            required
                          />
                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_isdigitalversion"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Digital Version  {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_isdigitalversion"
                            defaultValue={this.state.doc_isdigitalversion}
                            type= "text"
                            name="doc_isdigitalversion"
                            onChange={this.handleChange}
                            required
                          />

                        </div>



                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_room_number"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                           Room Number{" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_room_number"
                            defaultValue={this.state.doc_room_number}
                            type= "text"
                            name="doc_room_number"
                            onChange={this.handleChange}
                            required
                          />

                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_room_level"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Room Level  {" "}
                          </label>
                          <input
                            className="form-control"
                            id="doc_room_level"
                            defaultValue={this.state.doc_room_level}
                            type= "text"
                            name="doc_room_level"
                            onChange={this.handleChange}
                            required
                          />
                        </div>

                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_rack_number"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Rack Number  {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_rack_number"
                            defaultValue={this.state.doc_rack_number}
                            type= "text"
                            name="doc_rack_number"
                            onChange={this.handleChange}
                            required
                          />

                        </div>

                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_rack_level"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                          Rack Level {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_rack_level"
                            defaultValue={this.state.doc_rack_level}
                            type= "text"
                            name="doc_rack_level"
                            onChange={this.handleChange}
                            required
                          />

                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_totalnoofcopies"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                          Total Copies {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_totalnoofcopies"
                            defaultValue={this.state.doc_totalnoofcopies}
                            type= "text"
                            name="doc_totalnoofcopies"
                            onChange={this.handleChange}
                            required
                          />

                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_noofcopiesavailable"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Available Copies  {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_noofcopiesavailable"
                            defaultValue={this.state.doc_noofcopiesavailable}
                            type= "text"
                            name="doc_noofcopiesavailable"
                            onChange={this.handleChange}
                            required
                          />

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer d-flex justify-content-end">
                    <Button  type="submit" style={{backgroundColor:"#983132",color:"antiquewhite"}}
                      >
Save                    </Button>
                    <Button
                      // onClick={() => {
                      //   alert("Are you sure you want to cancel");
                      // }}

                      className="cancelBtn"
                      // data-dismiss="modal"
                      style={{backgroundColor:"#983132",color:"antiquewhite"}}
                      aria-label="Close"
                      onClick={this.hideAddUserPopup}
                    >
Cancel                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>


            <Modal
              show={this.state.showeditform}
              onHide={this.hideAddUserPopup}
              style={{
                display: "flex",
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{fontFamily:"initial",fontSize:"35px"}}>Add Document</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={(e) => this.onSubmit(e)}>
                  <div className="modal-body mx-3">
                    <div className="rowclass">
                      <div className="form-row" style={{ marginLeft: "11px", marginRight: "11px" }}>
                      <div className="form-group col-md-6" style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_id"
                            style={{
                              float: "left",
                              color: "dark-black",
                              paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px"
                            }}
                          >
                           Document ID {" "}
                          </label>
                          <input
                            className="form-control"
                            id="doc_id"
                            type="text"
                            name="doc_id"
                            defaultValue={this.state.doc_id}
                            onChange={this.handleChange}
                            maxLength="15"
                            required
                          />
                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_category"
                            style={{
                              float: "left",
                              color: "dark-black",
                              paddingRight: "10px",
                               width: "50%",fontFamily:"initial",fontSize:"18px"
                            }}
                          >
                         Category   {" "}
                          </label>
                          <input
                            className="form-control"
                            id="doc_category"
                            type="text"
                            name="doc_category"
                            defaultValue={this.state.doc_category}
                            onChange={this.handleChange}
                            maxLength="15"
                            required
                          />
                        </div>

                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_isdigitalversion"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Digital Version  {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_isdigitalversion"
                            defaultValue={this.state.doc_isdigitalversion}
                            type= "text"
                            name="doc_isdigitalversion"
                            onChange={this.handleChange}
                            required
                          />

                        </div>



                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_room_number"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                           Room Number{" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_room_number"
                            defaultValue={this.state.doc_room_number}
                            type= "text"
                            name="doc_room_number"
                            onChange={this.handleChange}
                            required
                          />

                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_room_level"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Room Level  {" "}
                          </label>
                          <input
                            className="form-control"
                            id="doc_room_level"
                            defaultValue={this.state.doc_room_level}
                            type= "text"
                            name="doc_room_level"
                            onChange={this.handleChange}
                            required
                          />
                        </div>

                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_rack_number"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Rack Number  {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_rack_number"
                            defaultValue={this.state.doc_rack_number}
                            type= "text"
                            name="doc_rack_number"
                            onChange={this.handleChange}
                            required
                          />

                        </div>

                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_rack_level"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                          Rack Level {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_rack_level"
                            defaultValue={this.state.doc_rack_level}
                            type= "text"
                            name="doc_rack_level"
                            onChange={this.handleChange}
                            required
                          />

                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_totalnoofcopies"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                          Total Copies {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_totalnoofcopies"
                            defaultValue={this.state.doc_totalnoofcopies}
                            type= "text"
                            name="doc_totalnoofcopies"
                            onChange={this.handleChange}
                            required
                          />

                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_noofcopiesavailable"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Available Copies  {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_noofcopiesavailable"
                            defaultValue={this.state.doc_noofcopiesavailable}
                            type= "text"
                            name="doc_noofcopiesavailable"
                            onChange={this.handleChange}
                            required
                          />

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer d-flex justify-content-end">
                    <Button  type="submit" style={{backgroundColor:"#983132",color:"antiquewhite"}}
                      >
Save                    </Button>
                    <Button
                      // onClick={() => {
                      //   alert("Are you sure you want to cancel");
                      // }}

                      className="cancelBtn"
                      // data-dismiss="modal"
                      style={{backgroundColor:"#983132",color:"antiquewhite"}}
                      aria-label="Close"
                      onClick={this.hideAddUserPopup}
                    >
Cancel                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>


{/* Edit Starts below */}


            <Modal show={this.state.showupdate} onHide={this.handleUpdateClose}>
            <Modal.Header closeButton>
              <Modal.Title className="w-100 font-weight-bold">
             Edit Document
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className=" mx-3">
              <form onSubmit={(e) => {this.setState({editDataTransfer:e});this.onEdit(e, this.state.editDataTransfer)}}>
              <div className="modal-body mx-3">
                    <div className="rowclass">
                      <div className="form-row" style={{ marginLeft: "11px", marginRight: "11px" }}>
                      <div className="form-group col-md-6" style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_id"
                            style={{
                              float: "left",
                              color: "dark-black",
                              paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px"
                            }}
                          >
                           Document ID {" "}
                          </label>
                          <input
                            className="form-control"
                            id="doc_id"
                            type="text"
                            name="doc_id"
                            defaultValue={test.docid}
                            onChange={(e) => {
                              this.handleEditChange(e);
                            }}
                            maxLength="15"
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_category"
                            style={{
                              float: "left",
                              color: "dark-black",
                              paddingRight: "10px",
                               width: "50%",fontFamily:"initial",fontSize:"18px"
                            }}
                          >
                         Category   {" "}
                          </label>
                          <input
                            className="form-control"
                            id="doc_category"
                            type="text"
                            name="doc_category"
                            defaultValue={test.doc_category}
                            onChange={(e) => {
                              this.handleEditChange(e);
                            }}
                            maxLength="15"
                            required
                          />
                        </div>

                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_isdigitalversion"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Digital Version  {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_isdigitalversion"
                            defaultValue={test.doc_isdigitalversion}
                            type= "text"
                            name="doc_isdigitalversion"
                            onChange={(e) => {
                              this.handleEditChange(e);
                            }}
                            required
                          />

                        </div>



                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_room_number"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                           Room Number{" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_room_number"
                            defaultValue={test.doc_room_number}
                            type= "text"
                            name="doc_room_number"
                            onChange={(e) => {
                              this.handleEditChange(e);
                            }}
                            required
                          />

                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_room_level"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Room Level  {" "}
                          </label>
                          <input
                            className="form-control"
                            id="doc_room_level"
                            defaultValue={test.doc_room_level}
                            type= "text"
                            name="doc_room_level"
                            onChange={(e) => {
                              this.handleEditChange(e);
                            }}
                            required
                          />
                        </div>

                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_rack_number"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Rack Number  {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_rack_number"
                            defaultValue={test.doc_rack_number}
                            type= "text"
                            name="doc_rack_number"
                            onChange={(e) => {
                              this.handleEditChange(e);
                            }}
                            required
                          />

                        </div>

                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_rack_level"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                          Rack Level {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_rack_level"
                            defaultValue={test.doc_rack_level}
                            type= "text"
                            name="doc_rack_level"
                            onChange={(e) => {
                              this.handleEditChange(e);
                            }}
                            required
                          />

                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_totalnoofcopies"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                          Total Copies {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_totalnoofcopies"
                            defaultValue={test.doc_totalnoofcopies}
                            type= "text"
                            name="doc_totalnoofcopies"
                            onChange={(e) => {
                              this.handleEditChange(e);
                            }}
                            required
                          />

                        </div>
                        <div className="form-group col-md-6"style={{display:"flex",paddingBottom:"15px"}}>
                          <label
                            className="required"
                            htmlFor="doc_noofcopiesavailable"
                            style={{ float: "left", paddingRight: "10px", width: "50%",fontFamily:"initial",fontSize:"18px" }}
                          >
                         Available Copies  {" "}
                          </label>

                          <input
                            className="form-control"
                            id="doc_noofcopiesavailable"
                            defaultValue={test.doc_noofcopiesavailable}
                            type= "text"
                            name="doc_noofcopiesavailable"
                            onChange={(e) => {
                              this.handleEditChange(e);
                            }}
                            required
                          />

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer d-flex justify-content-end">
                  <Button  type="submit" style={{backgroundColor:"#983132",color:"antiquewhite"}}
                      >

{/* <Button variant="primary" onClick={(e) => { this.onEdit('',this.state.editDataTransfer); this.setState({ showupdate:false})}}> */}

Save                    </Button>


                    <Button
                      // onClick={() => {
                      //   alert("Are you sure you want to cancel");
                      // }}

                      className="cancelBtn"
                      // data-dismiss="modal"
                      style={{backgroundColor:"#983132",color:"antiquewhite"}}
                      aria-label="Close"
                      onClick={this.handleUpdateClose}
                    >
Cancel                    </Button>
                  </div>

                <hr></hr>


              </form>{" "}
            </Modal.Body>
          </Modal>
    </div>
      </div>


	);
}
}

export default Documents;
