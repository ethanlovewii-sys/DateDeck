import React from 'react';
import './social.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fakePosts } from '../utils/fakePosts'; 

export function Social() {

    const [allPosts, setAllPosts] = React.useState(fakePosts);
    const [feedPosts, setFeedPosts] = React.useState([]);
    const [noMorePosts, setNoMorePosts] = React.useState(false);
    const startPageNoMorePosts = feedPosts.length === 0;

    const shuffle = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
        };

    React.useEffect(() => {
        const saved = localStorage.getItem("dateFeedPosts");

        let startingPosts;

        if (saved) {
            startingPosts = JSON.parse(saved);
        } else {
            startingPosts = shuffle(fakePosts).map(post => ({
                ...post,
                seen: false,
                liked: false,
            }));
        }

        // determine first batch from starting data
        const unseenPosts = startingPosts.filter(post => !post.seen);
        const firstBatch = unseenPosts.slice(0, 5);

        // mark first batch as seen
        const updatedPosts = startingPosts.map(post =>
            firstBatch.some(batchPost => batchPost.id === post.id)
                ? { ...post, seen: true }
                : post
        );

        setAllPosts(updatedPosts);
        setFeedPosts(firstBatch);

    }, []);

    React.useEffect(() => {
        if (allPosts.length > 0) {
            localStorage.setItem("dateFeedPosts", JSON.stringify(allPosts));
        }
    }, [allPosts]);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                loadMorePosts();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [allPosts]);



    function loadMorePosts() {
        const unseenPosts = allPosts.filter(post => !post.seen);
        if (unseenPosts.length === 0){
            setNoMorePosts(true);
            return;
        }
        

        const nextBatch = unseenPosts.slice(0, 1);

        const updateAllPosts = allPosts.map(post => {
            if (nextBatch.some(batchPost => batchPost.id === post.id)) {
                return { ...post, seen: true };
            }
            return post;
        });

        setAllPosts(updateAllPosts);
        setFeedPosts(prev => [...prev, ...nextBatch]);
    }

    function handleLike(postId) {
        const updatedPosts = allPosts.map(post => {
            if (post.id === postId) {
                return { ...post, liked: !post.liked };
            }
            return post;
        });
        setAllPosts(updatedPosts);

        const updatedFeed = feedPosts.map(post => {
        if (post.id === postId) {
            const isLiking = !post.liked;

            return {
                ...post,
                liked: isLiking,
                likes: isLiking ? post.likes + 1 : post.likes - 1
            };
        }
        return post;
        });
        setFeedPosts(updatedFeed);
    }

    return (
            <main>
                <div className="social-feed">
                    {feedPosts.map(post => (
                        <div key={post.id} className="feed-post">
                        
                            <div className="post-header">
                                <img className="user-avatar" src={post.avatar} alt="User Avatar"/>
                                <div className="username">{post.user}</div>
                                <div className="post-number">{post.dateNum}❤</div>
                                <div className="post-time">{post.time}</div>
                            </div>

                            <div className="post-card">
                                <h3 className="card-title-post">{post.title}</h3>
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
                                <button className="like-btn" onClick={() => handleLike(post.id)}>
                                    <img className="heart" src={post.liked ? "/liked-heart.png" : "/unliked-heart.png"} alt="Heart Icon"/>
                                     Likes {post.likes}
                                </button>
                            </div>

                        </div>
                            ))}

                    {noMorePosts && (
                        <div className="caught-up-message">
                            🎉 You're all caught up!
                        </div>
                    )}

                    {startPageNoMorePosts && (
                        <div className="start-caught-up">
                            <img src="/empty_deck.png" className="empty-feed-img"/>
                            <p className="empty-deck">No new posts!</p>
                        </div>
                    )}
                </div>
            </main>
  );
}