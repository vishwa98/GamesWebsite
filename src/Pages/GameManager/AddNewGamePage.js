import React, { useState, useEffect } from "react";
import Content from "../customer/Content";
import { GetToken, IsGameManagerLoggedIn } from "../../Util";
import {} from "../..";
const URL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

export default function AddNewGamePage({ history }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!IsGameManagerLoggedIn()) {
      history.push("/forbidden", {
        pageTriedToAccess: "/gameAdmin/create/game",
      });
    } 
  }, []);

  const addGameForm = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("formId"));

    fetch(`${URL}game/create`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          history.push("/gameAdmin", {
            success: true,
            msg: "Successfully added the game",
          });
        } else {
          setError(data.error);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  

  const errorAlert = (msg) => {
    return (
      <div className="alert alert-danger" role="alert">
        {msg}
      </div>
    );
  };

  return (
    <Content>
      <div className="container mt-5">
        {error && errorAlert(error)}
        <form id="formId" onSubmit={addGameForm}>
          <div className="form-group">
            <label htmlFor="inputGameName">Game Name:</label>
            <input
              type="text"
              className="form-control"
              id="inputGameName"
              placeholder="Game Name"
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputDescription">Game Description:</label>
            <input
              type="text"
              className="form-control"
              id="inputDescription"
              placeholder="Description"
              name="description"
              maxLength={1000}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputgameURL">Game URL:</label>
            <input
              type="text"
              className="form-control"
              id="inputgameURL"
              placeholder="gameURL"
              name="gameURL"
              maxLength={1000}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPhoto">Photo:</label>
            <input
              type="file"
              className="form-control"
              id="inputPhoto"
              placeholder="Photo"
              name="photo"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Game
          </button>
        </form>
      </div>
    </Content>
  );
}
