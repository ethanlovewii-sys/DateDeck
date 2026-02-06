import React from 'react';
import './deck.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Deck() {
  return (
        <main>
        <div className="date-deck">

            <div className="date-card active">
                <h3 className="card-number">2❤︎</h3>
                <h3 className="card-title text-center pb-2 pt-1">Go to the Arcade!</h3>
                <img src="/date_img_placeholder.jpeg" className = "date-img"/>
                <div className="card-description">
                  <p className="description">Details:</p>
                  <p>The nickle arcade by In and Out. Afterwards we can grab a bite to eat there.</p>
                </div>
                <div className="card-tags">
                    <span>Indoor</span>
                    <span>Cheap</span>
                    <span>Exciting</span>
                </div>
                <h3 className="bottom-card-number">2❤︎</h3>
            </div>
          
            <div className="date-card">
                <h3 className="card-number">3❤︎</h3>
                <h3 className="card-title text-center pb-2 pt-1">Ice skating!</h3>
                <img src="/date_img_placeholder2.jpeg"/>
                <p className="card-description">Description: The one in Provo. Jack said to try the night skating.</p>
                <div className="card-tags">
                    <span>Winter</span>
                    <span>Cheap</span>
                    <span>Active</span>
                </div>
                <h3 className="bottom-card-number">3❤︎</h3>
            </div>

            <div className="date-card">
                <h3 className="card-number">1❤︎</h3>
                <h3 className="card-title">Ice skating!</h3>
                <img src="/date_img_placeholder2.jpeg"/>
                <p className="card-description">The one in Provo. Jack said to try the night skating.</p>
                <div className="card-tags">
                    <span>Winter</span>
                    <span>Cheap</span>
                    <span>Active</span>
                </div>
                <h3 className="bottom-card-number">w-100</h3>
            </div>
        </div>
        <div className="all-cards-btn">
          <button className="custom-btn">View all cards</button>
        </div>
    </main>
  );
}