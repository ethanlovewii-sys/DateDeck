import React from 'react';
import './social.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fakePosts } from './fakePosts'; 

//add create post
//simulate friends post
//simulate interaction with posts (likes/comments)

export function Social() {

    const [posts, setPosts] = React.useState(fakePosts);

    return (
            <main>
                <div className="social-feed">
                    {posts.map(post => (
                        <div key={post.id} className="feed-post">
                        
                            <div className="post-header">
                                <img className="user-avatar" src={post.avatar} alt="User Avatar"/>
                                <div className="username">{post.user}</div>
                                <div className="post-number">{post.likes}❤</div>
                                <div className="post-time">{post.time}</div>
                            </div>

                            <div className="post-card">
                                <h3 className="card-title">{post.title}</h3>
                                <div className='image-container'>
                                    <img src={post.image} alt="date" className="post-image"/>
                                </div>
                                <p className="card-description">{post.description}</p>

                                <div className="card-tags">
                                {post.tags.map((tag, index) => (
                                    <span key={index}>{tag}</span>
                                ))}
                                </div>
                            </div>

                            <div className="post-actions">
                                <button className="like-btn">❤️ Like</button>
                                <button className="comment-btn">💬 Comment</button>
                            </div>

                        </div>
                            ))}
                
                </div>
            </main>
  );
}




{/* <div className="feed-post">
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
            </div> */}