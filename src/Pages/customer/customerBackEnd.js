const API =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

export const displaygames = (sortProducts) => {
  return fetch(`${API}games?sortPro=${sortProducts}&orderPro=desc&limit=9`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const displaySingleGame = (gameId) => {
  return fetch(`${API}game/${gameId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


export const rat = (userId, token, gameId, rating) => {
  return fetch(`${API}game/rating`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ userId, gameId, rating }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


