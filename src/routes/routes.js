import React from "react";
import { Route, Redirect } from "react-router-dom";

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtect,
  ...rest
}) =>{
  const data = JSON.parse(sessionStorage.getItem('loginInfo'))
  const sessionToken = data?.token
  return (
  <Route
    {...rest}
    render={props => {
      if (isAuthProtect && !sessionToken) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
)};

export default AppRoute;
