import React from "react";

import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) =>{

  const token = localStorage.getItem('token')

  
  
  return(
  <Route
    {...rest}
    render={(props) =>
      token ? (
        <Redirect to='/' />
      ) : (
        <Component {...props} />
      )
    }
  />
)

};


export default PrivateRoute;
