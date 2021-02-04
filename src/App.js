import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes";
import "./App.css";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/context";
import { Auth } from "aws-amplify";
import { onError } from "./libs/error";

const App = () => {
  const history = useHistory();
  const [authenticating, setAuthenticating] = useState(true);
  const [auth, isAuth] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      isAuth(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setAuthenticating(false);
  };

  const handleLogout = async () => {
    await Auth.signOut();
    isAuth(false);
    history.push("/login");
  };

  return (
    !authenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              Notes
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {auth ? (
                <React.Fragment>
                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ auth, isAuth }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
};

export default App;
