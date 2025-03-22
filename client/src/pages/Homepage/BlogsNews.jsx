import React from 'react';
import './BlogsNews.css';

const BlogsNews = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Alert on hMPV at UK",
            body: "UK is on high alert following a surge in human metapneumovirus (hMPV) cases, with health authorities urging Britons to wear mask and take precautions",
            image: "https://static.toiimg.com/thumb/msid-117605514,imgsize-893934,width-400,resizemode-4/117605514.jpg"
        },
        {
            id: 2,
            title: "Dengue and Leptospirosis in Kochi",
            body: "According to official figures, as of January 26, three of the four deaths recorded were due to dengue, with the victims being male residents aged 52, 63, 65, and 47, from varied areas including Varapuzha, Palluruthy, Edathala, and Veliyathunad. ",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Aedes_aegypti_feeding.jpg/290px-Aedes_aegypti_feeding.jpg"
        },
        {
            id: 3,
            title: "AI Tool “DeepMerkel”",
            body: "Newcastle University research team develops AI system to personalise treatment outcomes for Merkel cell carcinoma and other aggressive skin cancers",
            image: "https://etimg.etb2bimg.com/photo/111299715.cms"
        }
    ];

    return (
        <div className="blogs-container">
            <h1 className="main-title">Blogs / News</h1>

            <div className="blog-list">
                {blogPosts.map(post => (
                    <div key={post.id} className="blog-card">
                        <div className="blog-image">
                            <img src={post.image} alt={post.title} />
                        </div>
                        <div className="blog-content">
                            <h2 className="blog-title">{post.title}</h2>
                            <p className="blog-body">{post.body}</p>
                            <button
                                className="read-more"
                                onClick={() => window.open('https://timesofindia.indiatimes.com/life-style/health-fitness/health-news', '_blank')}
                            >
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogsNews;