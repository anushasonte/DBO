import './App.css';
import Documents from './Components/documents';
import DocumentEdit from './Components/DocumentEdit/DocumentEdit';

import { BrowserRouter as Router, Switch , Route, Navigate  } from "react-router-dom";
import React, { useState, lazy, Suspense } from "react";
import history from "./history";
import Login from "./Components/Login/Login";
import MemberDocuments from "./Components/MemberDocuments/MemberDocuments";

import Sidebar from "./Components/sidebar/sidebar";
import NavBar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
const AuthenticatedRoutes = lazy(() => import("./Components/Login/authenticatedRoutes"));

const App = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [sidebarHovered, setSidebarHovered] = useState(false);
//   const setUserInfoStatus = (status) => {
//     // console.log(status);
//   };
//   const userInfo = {
//     role: "Librarian"

//   };

//   const LoginContainer = () => (
//     <div>
//       <Route path="/" exact component={Login} />
//       <Route path="/login" exact component={Login} />
//     </div>
//   )

//   const DefaultContainer = () => (
//       <div>
//         <NavBar />
//         <div
//           className={`page-wrapper default-theme border-radius-on toggled ${
//             !sidebarOpen ? "pinned" : ""
//           } ${sidebarHovered ? "sidebar-hovered" : ""}`}
//         >
//           <Sidebar
//             handleHover={() =>
//               setSidebarHovered(sidebarOpen ? false : !sidebarHovered)
//             }
//             userInfo={userInfo}
//             handleStatusChange={(status) => setUserInfoStatus(status)}
//           ></Sidebar>
//           <div className="bodyContents">

//               <Route  path="/documents" component={Documents} />


//               {/* <Dashboard /> */}
//           </div>
//           <br></br>
//           <br></br>
//           <Footer></Footer>
//         </div>
//       </div>
//   )

//   return (
//     <div className="App page-zoom">
//       <Router history={history}>
//         <Routes >
//           {/* <Route exact path="/" component={LoginContainer}/> */}
//           <Route exact path="/" render={() => <Navigate  to="/login" />} />
//           <Route exact path="/(login)" component={LoginContainer}/>
//           {/* <Route component={DefaultContainer}/> */}
//           <Suspense fallback={
//             <div className="text-center mt-4 h2 p-4 text-white">
//                 <span className="fa fa-spinner fa-spin"></span>&nbsp;Loading
//             </div>}
//           >
//             <AuthenticatedRoutes component={DefaultContainer} />
//           </Suspense>
//         </Routes >
//       </Router>
//     </div>
//   );
// };

return(
<Router history={history}>

    <Switch>
      <Route path="/login" component={Login} />

      <Route  path="/librarian" component={Documents} />
      <Route  path="/members" component={MemberDocuments} />

    </Switch>
  </Router>
)
}

export default App;