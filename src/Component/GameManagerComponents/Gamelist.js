import React from "react";
import { useHistory } from "react-router-dom";
import { GetToken } from "../../Util";

const URL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

export default function Gamelist({ gamee, deleteGameById }) {
  const history = useHistory();
  
  const gameDel = () => {
    deleteGameById(gamee._id);
  };
  return (
    <>
      {gamee.name}
      <div>
        
        <button className="btn btn-danger ml-3" onClick={gameDel}>
          Delete
        </button>
      </div>
    </>
  );
}
