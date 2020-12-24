import React, { useState, useEffect } from "react";
import Content from "./Content";
import { displaySingleGame } from "./customerBackEnd";
import SingleProUI from "./SingleProUI";
import Rating from "./Rating";

const Product = (props) => {
  const [singleGame, setSingleGame] = useState({});
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [game, setGame] = useState({});

  //Get the single Game data

  const selectedGameView = (gameId) => {
    displaySingleGame(gameId).then((sgame) => {
      if (sgame && sgame.error) {
        setError(sgame.error);
      } else if (sgame) {
        setSingleGame(sgame);
        setGame(sgame);
        setComments(sgame.comments);
        console.log("Game", sgame);

        setRatings(average(sgame.ratings));
      } else {
        console.log("Error in loading game");
      }
    });
  };

  useEffect(() => {
    const gameId = props.match.params.gameId;
    console.log(gameId);
    selectedGameView(gameId);
  }, []);


  const showGameRatings = (ratings) => {
    setRatings(ratings);
  };


  const average = (nums) => {
    if (!nums.length) return 0;
    let sum = 0;
    for (let i = 0; i < nums.length; ++i) sum += parseInt(nums[i].text);
    console.log("Sum: ", sum);
    return sum / nums.length;
  };

  return (
    <Content>
      <div className="container">
        <div>
          {/* Page info */}
          <div className="page-top-info">
            <div className="container">
              <h4>Game Page</h4>
              <div className="site-pagination">
                <h6>Leave a rating here</h6>
              </div>

              {game && (
            <div className="d-flex justify-content-between">
              <Rating
                gameId={game._id}
                ratings={ratings}
                showGameRatings={showGameRatings}
              />
              <h3>{ratings.toFixed(1)}</h3>
            </div>
          )}


            </div>
          </div>
          {/* Page info end */}
          {/* product section */}

          {singleGame && singleGame.description && (
            <SingleProUI
              gameId={game._id}
              game={singleGame}

            />
          )}

          {/* product section end */}

          {/* Comments */}
          
          
        </div>
      </div>
    </Content>
  );
};

export default Product;
