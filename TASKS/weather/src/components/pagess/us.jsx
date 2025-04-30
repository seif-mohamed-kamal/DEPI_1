import React, { useEffect, useState } from 'react';

function Us() {
    const [news, setNews] = useState([]);


    const getNews = async () => {
        const response = await fetch("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=470aeabc4f694d6d847d98c9e8ec9059");
        const data = await response.json();
        setNews(data.articles);
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <>
            <section className="container my-5">
                <section className="bg-dark text-light text-center py-5">
                    <h3>US NEWS</h3>
                </section>
                <div className="row" id="news-container">
                    {news.length > 0 ? (
                        news.map((article, index) => (
                            <div className="col-md-6 mx-auto my-5" key={index}>
                                <div className="card">
                                    {article.urlToImage && (
                                        <img src={article.urlToImage} className="card-img-top" alt={article.title} />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">{article.description}</p>
                                        <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                            more details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-md-8 mx-auto my-5">
                            <div className="alert alert-warning" role="alert">
                                No news articles found.
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Us;