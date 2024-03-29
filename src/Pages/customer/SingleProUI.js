import React, { useState } from "react";
import ProductImage from "./ProductImage";


const SingleProUI = ({
  game,
  playGameBtn = true,
}) => {
 

  const playGame = (playGameBtn) => {
    return (
      playGameBtn && (
        <a href= {game.gameURL} className="site-btn">
          PLAY
        </a>
      )
    );
  };
  

  return (
    <div className="card">
      

      <section className="product-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-pic-zoom">
                <ProductImage pro={game} url="game"></ProductImage>
              </div>
            </div>
            <div className="col-lg-6 product-details">
              <h2 className="p-title">{game.name}</h2>
              
              

              {playGame(playGameBtn)}
              
              <div id="accordion" className="accordion-area">
                <div className="panel">
                  <div className="panel-header" id="headingOne">
                    <button
                      className="panel-link active"
                      data-toggle="collapse"
                      data-target="#collapse1"
                      aria-expanded="true"
                      aria-controls="collapse1"
                    >
                      information
                    </button>
                  </div>
                  <div
                    id="collapse1"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="panel-body">
                      <p>{game.description.substring(0, 80)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="social-sharing">
                <a>
                  <i className="fa fa-google-plus" />
                </a>
                <a>
                  <i className="fa fa-pinterest" />
                </a>
                <a>
                  <i className="fa fa-facebook" />
                </a>
                <a>
                  <i className="fa fa-twitter" />
                </a>
                <a>
                  <i className="fa fa-youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProUI;
