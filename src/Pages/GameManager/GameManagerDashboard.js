import React, { Component } from "react";
import Content from "../customer/Content";
import { IsLoggedIn, IsCustomerLoggedIn, GetToken } from "../../Util";
import SearchResult from "../../Component/GameManagerComponents/SearchResult";
const URL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

export default class GameManagerDashboard extends Component {
  constructor(props) {
    super(props);
    if (!IsLoggedIn() || IsCustomerLoggedIn()) {
      props.history.push("/forbidden", { pageTriedToAccess: "/gameAdmin" });
    }
    this.state = {
      searchQuery: "",
      games: [],
      filteredGames: [],
      success: "",
      error: "",
    };
  }

  componentDidMount() {
    fetch(`${URL}games`)
      .then((res) => res.json())
      .then((gamesResponse) => {
        this.setGames(gamesResponse);
        this.setFilteredGames(gamesResponse);
      })
      .catch((err) => console.log(err));

    
  }

 

  
  setGames = (games) => {
    this.setState({ games });
  };


  setFilteredGames = (filteredGames) => {
    this.setState({ filteredGames });
  };

  // adding a new game

  onClickAddNewGame = () => {
    this.props.history.push("/gameAdmin/create/game");
  };

  setSuccess = (msg) => {
    this.setState({
      success: msg,
    });
  };

  updateFilteredList = () => {
    this.setState((prevState) => ({
      filteredGames: prevState.games.filter(
        (prod) =>
          prod.name
            .toLowerCase()
            .search(this.state.searchQuery.toLowerCase()) !== -1
      ),
    }));
  };

  deleteGameById = (id) => {
    fetch(`${URL}game/delete/${id}`, {
      method: "DELETE",
      body: { id },
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    })
      .then((res) => res.json())
      .then((msg) => {
        if (msg.success) {
          this.setSuccess("Game Deleted Successfully");
          this.setState(
            (prevState) => ({
              games: prevState.games.filter((p) => p._id !== id),
            }),
            this.updateFilteredList
          );
        } else {
          this.setState({ error: msg.error });
        }
      })
      .catch((err) => this.setState({ error: err }));
  };

  render() {
    const errorAlert = (msg) => {
      return (
        <div className="alert alert-danger" role="alert">
          {msg}
        </div>
      );
    };
    const successAlert = (msg) => {
      return (
        <div className="alert alert-success" role="alert">
          {msg}
        </div>
      );
    };
    return (
      <Content>
        <div className="container">
          <div className="d-flex flex-row justify-content-between">
            <h2 className="mt-3">Welcome Admin</h2>
            <button
              className="btn btn-primary mt-3"
              style={{ height: "36px" }}
              onClick={this.onClickAddNewGame}
            >
              Add New Game
            </button>
          </div>

          <div className="mt-5">
            {this.state.success && successAlert(this.state.success)}
            {this.state.error && errorAlert(this.state.error)}
            {this.state.games.length > 0 ? (
              <SearchResult
                query={this.state.searchQuery}
                games={this.state.filteredGames}
                deleteGameById={this.deleteGameById}
              />
            ) : (
              <h2>Loading Games....</h2>
            )}
          </div>
        </div>
      </Content>
    );
  }
}
