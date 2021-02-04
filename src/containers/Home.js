import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/context";
import { onError } from "../libs/error";
import { API } from "aws-amplify";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";
import { BsPencilSquare } from "react-icons/bs";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const { auth } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onLoad = async () => {
      if (!auth) return;

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    };

    onLoad();
  }, [auth]);

  const loadNotes = () => {
    return API.get("notes", "/notes");
  };

  const renderNotesList = (notes) => {
    return (
      <React.Fragment>
        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new note</span>
          </ListGroup.Item>
        </LinkContainer>
        {notes.map(({ noteID, content, createdAt }) => (
          <LinkContainer key={noteID} to={`/notes/${noteID}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </React.Fragment>
    );
  };

  const renderLandingPage = () => {
    return (
      <div className="lander">
        <h1>Notes</h1>
        <p className="text-muted">A simple notes taking app</p>
      </div>
    );
  };

  const renderNotes = () => {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  };

  return (
    <div className="home">{auth ? renderNotes() : renderLandingPage()}</div>
  );
};

export default Home;
