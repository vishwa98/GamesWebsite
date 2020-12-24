import React, { useState, useEffect } from "react";
import Content from "./Content";
import { displaygames } from "./customerBackEnd";
import HomeUI from "./HomeUI";

const Home = () => {
  const [trendingGames, settrendingGames] = useState([]);
  const [recentGames, setrecentGames] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  //Display the trending games in the home page

  const topGames = () => {
    displaygames("sold").then((data) => {
      if (!data) return;
      if (data.error) {
        setError(data.error);
      } else {
        settrendingGames(data);
      }
    });
  };

  //Display the most recent games in the home page

  const latestGames = () => {
    displaygames("createdAt").then((data) => {
      if (!data) return;
      console.log(data);

      if (data.error) {
        setError(data.error);
      } else {
        setrecentGames(data);
      }
    });
  };

  useEffect(() => {
    latestGames();
    topGames();
  }, []);

  return (
    <Content>
      <div>
        {/* Page Preloder */}
        <div id="preloder">
          <div className="loader" />
        </div>
        {/* Hero section */}
        
        {/* Hero section end */}
        {/* Features section */}
        <section className="features-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 p-0 feature">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src="img/icons/1.png" alt="#" />
                  </div>
                  <h2>Action</h2>
                </div>
              </div>
              <div className="col-md-4 p-0 feature">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src="img/icons/2.png" alt="#" />
                  </div>
                  <h2>Game Zone</h2>
                </div>
              </div>
              <div className="col-md-4 p-0 feature">
                <div className="feature-inner">
                  <div className="feature-icon">
                    <img src="img/icons/3.png" alt="#" />
                  </div>
                  <h2>Sports</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features section end */}

        {/* Product filter section */}
        <section className="product-filter-section">
          <div className="container">
            <div className="section-title">
              <h2>RECENT GAMES</h2>
            </div>

            <div className="row">
              {recentGames.map((newGames, j) => (
                <div key={j} className="col-4 mb-3">
                  <HomeUI key={j} game={newGames} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="product-filter-section">
          <div className="container">
            <div className="section-title">
              <h2>TRENDING GAMES</h2>
            </div>

            <div className="row">
              {trendingGames.map((trendingGames, j) => (
                <div key={j} className="col-4 mb-3">
                  <HomeUI key={j} game={trendingGames} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Content>
  );
};

export default Home;
