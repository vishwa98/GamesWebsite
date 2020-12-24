import React, { Component } from "react";
import StarRatings from "../../../node_modules/react-star-ratings";
import { rat } from "./customerBackEnd";
import { GetToken, GetId, IsLoggedIn } from "../../Util";

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.ratings,
    };
  }

  
  average = (nums) => {
    if (!nums.length) return 0;
    let sum = 0;
    for (let i = 0; i < nums.length; ++i) sum += parseInt(nums[i].text);
    console.log("Sum: ", sum);
    return sum / nums.length;
  };

  changeRating = (newRating, name, e) => {
    this.setState({
      rating: newRating,
    });

    if (IsLoggedIn()){
    const userId = GetId();
    const token = GetToken();
    const gameId = this.props.gameId;

    rat(userId, token, gameId, { text: newRating }).then((data) => {
      this.props.showGameRatings(this.average(data.ratings));
    });
  }else{

    alert("Please login to add ratings");
  }
  };

  render() {
    // rating = 2;
    const { wlistt } = this.props;
    return (
      <div>
        <StarRatings
          rating={this.props.ratings}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={6}
          name="rating"
        />
        {JSON.stringify(wlistt)};
      </div>
    );
  }
}

export default Rating;
