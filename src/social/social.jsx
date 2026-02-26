import React from 'react';
import './social.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//add create post
//simulate friends post
//simulate interaction with posts (likes/comments)

export function Social() {
  return (
        <main>
        <div className="social-feed">
        
        <div className="feed-post">
            <div className="post-header">
                <img className ="user-avatar" src="/user-avatar-placeholder.jpg" alt="User Avatar"/>
                <span className="username">E&S</span>
                <span className="post-number">12❤</span>
                <span className="post-time">3 days ago</span>
            </div>
            <div className="post-card">
                <h3 className="card-title">The Arcade!</h3>
                <img src="/date_img_placeholder.jpeg"/>
                <p className="card-description">Had a wonderful time at the nickle arcade on state street!</p>
                <div className="card-tags">
                    <span>Indoor</span>
                    <span>Cheap</span>
                    <span>Exciting</span>
                </div>
            </div>
            <div className="post-actions">
                <button className="like-btn">❤️ Like</button>
                <button className="comment-btn">💬 Comment</button>
            </div>
        </div>

        <div className="feed-post">
            <div className="post-header">
                <img className ="user-avatar" src="/user-avatar-placeholder.jpg" alt="User Avatar"/>
                <span className="username">E&S</span>
                <span className="post-number">12❤</span>
                <span className="post-time">2 hours ago</span>
            </div>
            <div className="post-card">
                <h3 className="card-title">Ice skating!</h3>
                <img src="/date_img_placeholder2.jpeg"/>
                <p className="card-description">Only fell a couple of times haha</p>
                <div className="card-tags">
                    <span>Winter</span>
                    <span>Cheap</span>
                    <span>Active</span>
                </div>
            </div>
            <div className="post-actions">
                <button className="like-btn">❤️ Like</button>
                <button className="comment-btn">💬 Comment</button>
            </div>
        </div>
      </div>
    </main>
  );
}