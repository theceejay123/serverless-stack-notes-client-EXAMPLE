import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../libs/context";

const queryString = (name, url = window.location.href) => {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const UnauthenticatedRoute = ({ children, ...rest }) => {
  const { auth } = useAppContext();
  const redirect = queryString("redirect");
  return (
    <Route {...rest}>
      {!auth ? (
        children
      ) : (
        <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
      )}
    </Route>
  );
};

export default UnauthenticatedRoute;
