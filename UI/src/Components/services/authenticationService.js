// import axios, { CancelToken } from "axios";
// import { BASE_URL } from "./apiUtils";
// import ReactGA from "react-ga";
import * as Constants from "../Constants";
import axios from "axios";

//const cookies = new Cookies();

class AuthenticationService {

    // executeJwtAuthenticationService(username, password) {
    //     return axios.post(`${BASE_URL}authentication`, {
    //         "username": username,
    //         "password": password
    //     }, {
    //         headers: {
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Credentials': 'true'
    //         }
    //     })
    // }

    // registerSuccessfulLogin(username, role, organizationName, tenantName, tenantType, tenantId,languageId,userId) {
    //     const userRole = encryptor.encrypt(role);
    //     sessionStorage.setItem(Constants.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    //     sessionStorage.setItem(Constants.USER_ROLE_SESSION_ATTRIBUTE_NAME, userRole);
    //     sessionStorage.setItem(Constants.USER_ORGANIZATION_NAME_SESSION_ATTRIBUTE_NAME, organizationName);
    //     sessionStorage.setItem(Constants.USER_TENANT_TYPE_SESSION_ATTRIBUTE_NAME, tenantType);
    //     sessionStorage.setItem(Constants.USER_TENANT_NAME_SESSION_ATTRIBUTE_NAME, tenantName);
    //     sessionStorage.setItem(Constants.USER_TENANT_ID_SESSION_ATTRIBUTE_NAME, tenantId);
    //     sessionStorage.setItem(Constants.USER_LANGUAGE_ID_SESSION_ATTRIBUTE_NAME, languageId);
    //     sessionStorage.setItem(Constants.USER_USER_ID_SESSION_ATTRIBUTE_NAME, userId);


    //     //this.setupAxiosInterceptors(this.createJWTToken(token))
    // }
    executeBasicAuthenticationService(username, password) {

      const auservice=  axios.post(Constants.authenticate,
      {username,password},
      { headers:
            {
                //authorization: this.createBasicAuthToken(username, password),
        "Access-Control-Allow-Origin": "*"
        },

             });
      return auservice;
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        //console.log('registerSuccessfulLogin')

        // sessionStorage.setItem(Constants.USER_ROLE_SESSION_ATTRIBUTE_NAME, "");
        // sessionStorage.setItem(Constants.USER_TENANT_NAME_SESSION_ATTRIBUTE_NAME, "Atos"); //
        // sessionStorage.setItem(Constants.USER_TENANT_ID_SESSION_ATTRIBUTE_NAME, tenantId);
        // sessionStorage.setItem(Constants.USER_TENANT_TYPE_SESSION_ATTRIBUTE_NAME, "Org"); // remove

     //   sessionStorage.setItem(Constants.USER_TENANT_NAME_SESSION_ATTRIBUTE_NAME, "Syntel");
    //     sessionStorage.setItem(Constants.USER_LANGUAGE_ID_SESSION_ATTRIBUTE_NAME, "");
    //    // sessionStorage.setItem(Constants.USER_USER_ID_SESSION_ATTRIBUTE_NAME, userId);
        sessionStorage.setItem(Constants.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        //sessionStorage.setItem(Constants.AUTH_SESSION_ATTRIBUTE_NAME,'Basic ' + window.btoa(username + ":" + password))
      //  this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    //     var cook= Cookies.get('JSESSIONID');
    //
    //    console.log(cook);
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {

                if (this.isUserLoggedIn()) {
                    config.headers.Authorization = token

                }

                return config
            }
        )
    }

    // createJWTToken(token) {
    //     return 'Bearer ' + token
    // }

    // logout() {
    //     ReactGA.event({
    //         category: 'button',
    //         action: 'Click_logout',
    //         label: sessionStorage.getItem(Constants.USER_NAME_SESSION_ATTRIBUTE_NAME) + ' is logged out'
    //       })
    //     sessionStorage.removeItem(Constants.USER_NAME_SESSION_ATTRIBUTE_NAME);
    //     sessionStorage.removeItem(Constants.USER_ROLE_SESSION_ATTRIBUTE_NAME);
    // }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(Constants.AUTH)
        if (user === null) return false
        return true
    }

    // getLoggedInUserRole() {
    //     let role = sessionStorage.getItem(Constants.USER_ROLE_SESSION_ATTRIBUTE_NAME)
    //     if (role === null) return ''
    //     return role
    // }

    // getLoggedInUserName() {
    //     let user = sessionStorage.getItem(Constants.USER_NAME_SESSION_ATTRIBUTE_NAME)
    //     if (user === null) return ''
    //     return user
    // }

    // setupAxiosInterceptors(token) {

    //     axios.interceptors.request.use(
    //         (config) => {
    //             if (this.isUserLoggedIn()) {
    //                 config.headers.Authorization = token;
    //                 config.timeout = 1000 * 5;
    //             }
    //             return config
    //         }, function (error) {
    //             return Promise.reject(error);
    //         }
    //     );
    // }
}

export default new AuthenticationService()