import React from "react";

import Gamelist from "./Gamelist";

export default function SearchResult({ query, games, deleteGameById }) {
  const gamesList = games.map((gamee) => {
    return (
      <li
        key={gamee._id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <Gamelist gamee={gamee} deleteGameById={deleteGameById} />
      </li>
    );
  });

  return (
    <div>
      <h3>Games List: {query}</h3>
      <hr />
      {games.length > 0 ? (
        <ul className="list-group mt-3">{gamesList}</ul>
      ) : (
        "No Games Found."
      )}
    </div>
  );
}
