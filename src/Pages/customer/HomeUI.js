import React from "react";
import { Link } from "react-router-dom";
import ProductImage from './ProductImage';



const HomeUI = ({ game, viewGameBtn = true }) => {


  //View Single Game

    const viewGame = (viewGameBtn) => {
        return(
          viewGameBtn && (
                <Link to={`/game/${game._id}`} className="mr-2">
                    <button className="btn btn-info">View</button>
                </Link>
            )
        )
    }

    return (
        
            <div>

                <div className="col-lg-10 col-sm-6">
          <div className="product-item">
            <div className="pi-pic">
                <ProductImage pro={game} url="game"></ProductImage>
             
            </div>
            <div className="pi-text">
            <h6>{viewGame(viewGameBtn)}</h6>
              <p>{game.name}</p>
              
            </div>
          </div>
            </div>


            </div>
        
    );
};

export default HomeUI;