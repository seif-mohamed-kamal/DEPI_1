import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [topPost, setTopPost] = useState(null);
    const [topComment, setTopComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [karmaData, setKarmaData] = useState(null);

    const cardStyle = {
        marginBottom: '1rem',
        border: '1px solid #ddd',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        borderRadius: '16px'

    };
    const pageBackgroundStyle = {
        backgroundColor: '#F7F7F7',
        padding: '2rem 1rem',
        color: '#2c3e50',
    };
        
    const fetchUserData = async () => {
        if (!username.trim()) {
            setError('Please enter a username!');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const profileResponse = await fetch(`https://www.reddit.com/user/${username}/about.json`);
            const profileData = await profileResponse.json();

            if (profileData.error) {
                setError('User not found!');
                setLoading(false);
                return;
            }

            const [postsResponse, commentsResponse] = await Promise.all([
                fetch(`https://www.reddit.com/user/${username}/submitted.json`),
                fetch(`https://www.reddit.com/user/${username}/comments.json`)
            ]);

            const postsData = await postsResponse.json();
            const commentsData = await commentsResponse.json();

            const user = profileData.data;
            const createdDate = new Date(user.created_utc * 1000).toLocaleDateString();
            const subreddit = user.subreddit ? user.subreddit.display_name_prefixed : "No personal subreddit";
            const subscribers = user.subreddit ? user.subreddit.subscribers : "N/A";

            setUserData({
                name: user.name,
                iconImg: user.icon_img,
                totalKarma: user.total_karma,
                postKarma: user.link_karma,
                commentKarma: user.comment_karma,
                createdDate,
                subreddit,
                subscribers
            });

            const posts = postsData.data.children;
            if (posts.length > 0) {
                const topPostData = posts.reduce((max, post) =>
                    (post.data.ups > max.data.ups ? post : max), posts[0]);
                
                setTopPost({
                    title: topPostData.data.title,
                    ups: topPostData.data.ups,
                    numComments: topPostData.data.num_comments,
                    permalink: topPostData.data.permalink
                });
            } else {
                setTopPost(null);
            }

            const comments = commentsData.data.children;
            if (comments.length > 0) {
                const topCommentData = comments.reduce((max, comment) =>
                    (comment.data.ups > max.data.ups ? comment : max), comments[0]);
                
                setTopComment({
                    body: topCommentData.data.body,
                    ups: topCommentData.data.ups,
                    permalink: topCommentData.data.permalink
                });
            } else {
                setTopComment(null);
            }

            setKarmaData({
                labels: ['Post Karma', 'Comment Karma'],
                datasets: [
                    {
                        data: [user.link_karma, user.comment_karma],
                        backgroundColor: [
                            'rgba(66, 133, 244, 0.6)',
                            'rgba(219, 68, 55, 0.6)',
                        ],
                        borderColor: [
                            'rgba(66, 133, 244, 1)',
                            'rgba(219, 68, 55, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });

        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch user data.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUserData();
    };

    return (
        <div className="min-vh-100" style={pageBackgroundStyle} >
        <div  className="container">
            <div className="card mb-4" style={cardStyle}>
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Reddit User Lookup</h5>
                    <form onSubmit={handleSearch} className="d-flex justify-content-center mb-3">
                        <input
                            type="text"
                            className="form-control me-2"
                            style={{ maxWidth: '300px' }}
                            placeholder="Enter Reddit username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button type="submit" className="btn btn-outline-primary">
                            Search
                        </button>
                    </form>
                    {error && <div className="text-danger text-center">{error}</div>}
                </div>
            </div>

            {loading && (
                <div className="text-center mb-4">
                    <div className="spinner-border text-primary">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {userData && (
                <>
                    <div className="row g-3 mb-4">
                        <div className="col-6 col-md-3">
                            <div className="card h-100" style={cardStyle}>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Username</h5>
                                    <p className="card-text mb-0">{userData.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card h-100" style={cardStyle}>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Account Created</h5>
                                    <p className="card-text mb-0">{userData.createdDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card h-100" style={cardStyle}>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Top followers</h5>
                                    <p className="card-text mb-0">{userData.subscribers}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card h-100" style={cardStyle}>
                                <div className="card-body text-center">
                                <h5 className="card-title">Total karma</h5>
                                <p className="card-text mb-0">{userData.totalKarma}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="d-flex flex-column flex-md-row justify-content-around align-items-stretch gap-1 mb-4">
                        <div className="col-md-8">
                            <div className="card  " style={cardStyle}>
                                <div className="card-body">
                                    <h5 className="card-title text-center">Karma Distribution</h5>
                                    <div style={{ height: '300px', width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                                        {karmaData ? (
                                            <Pie
                                                data={karmaData}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        legend: {
                                                            position: 'top',
                                                            labels: {
                                                                color: '#2c3e50',
                                                                font: {
                                                                    size: 13
                                                                }
                                                            }
                                                        },
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <p className="text-center">No karma data available</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex flex-row flex-md-column gap-1">
                                <div className="col-6 col-md-12 " style={cardStyle}>
                                    <div className="card test" style={{ height: '170px' }}>
                                        <div className="card-body d-flex flex-column justify-content-center text-center">
                                        <div class="text-dark fs-3 fw-normal  ">Post Karma</div>
                                        <div class="text-dark mb-2 fs-4">{userData.postKarma}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-md-12 "style={cardStyle}>
                                    <div className="card " style={{ height: '170px' }}>
                                        <div className="card-body d-flex flex-column justify-content-center text-center">
                                        <div class="text-dark fs-3 fw-normal ">Comment Karma</div>
                                        <div class="text-dark mb-2 fs-4">{userData.commentKarma}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row justify-content-around gap-1">
                        <div className="col-md-6" style={cardStyle}>
                            {topPost && (
                                <div className="card text-center mb-3" style={{ height: '200px' }}>
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                        <h5 className="card-title">Top Post</h5>
                                            <p className=" fw-bold mb-2 text-truncate" style={{ maxHeight: '3em', overflow: 'hidden' }}>
                                                {topPost.title}
                                            </p>
                                            <p className="fw-bold mb-2">
                                                👍 Likes: {topPost.ups} | 💬 Comments: {topPost.numComments}
                                            </p>
                                        </div>
                                        <a href={`https://reddit.com${topPost.permalink}`} target="_blank" className="btn btn-outline-primary">Go to post</a>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6" style={cardStyle}>
                            {topComment && (
                                <div className="card text-center mb-3 l-bg-ss" style={{ height: '200px' }}>
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <h5 className="card-title">Top Comment</h5>
                                            <p className="card-text text-truncate fw-bold" style={{ maxHeight: '3em', overflow: 'hidden' }}>
                                                {topComment.body}
                                            </p>
                                            <p className="mb-2 fw-bold">
                                                👍 Likes: {topComment.ups}
                                            </p>
                                        </div>
                                        <a href={`https://reddit.com${topComment.permalink}`} target="_blank"  className="btn btn-outline-primary" >Go to comment</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
        </div>
    );
}

export default Dashboard;
