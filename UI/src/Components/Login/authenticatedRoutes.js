import React, { Component } from 'react'
import { Route, Redirect  } from 'react-router-dom'
import AuthenticationService from '../services/authenticationService';

class AuthenticatedRoutes extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
            // <Navigate  to="/documents" />
        } else {
            return <Redirect  to="/login" />
        }
    }
}

export default AuthenticatedRoutes