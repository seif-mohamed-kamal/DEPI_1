import { useEffect, useState } from "react";
import { deletepost, getposts } from "../../services/courses.services";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Home() {
    const [posts, setposts] = useState([]);
    const [searched, setSearched] = useState("");

    useEffect(() => {
        getposts().then(res => setposts(res.data));
    }, []);

    const deleteposts = (id) => {
        deletepost(id).then(() => {
            Swal.fire({
                text: "Product deleted successfully",
                icon: "success",
                title: "Well done"
            });
            setposts(posts.filter(post => post.id !== id));
        });
    };

    return (
        <>
        <div className="container py-5" style={{ background: "#F7F7F7", borderRadius: "50px" ,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    }}>
            <div className="col-md-12 text-center mb-4">
            <h2 className="fw-bold">All Posts</h2>
        </div>

            <div className="container d-flex justify-content-center">
                <input
                    className="form-control w-50"
                    type="search"
                    placeholder="Search by title..."
                    onChange={(event) => setSearched(event.target.value)}
                />
                <Link to="/create" className="btn btn-sm mx-1 btn-primary rounded-3">Add posts</Link>
            </div>

            <section className="container my-5 text-center d-flex flex-wrap justify-content-center">
                {posts.length > 0 ? (
                    posts
                        .filter(p => p.title.toLowerCase().includes(searched.toLowerCase()))
                        .map(post => (
                            <div className="card mx-2 my-2" style={{ width: "18rem" }} key={post.id}>
                                <div className="card-body">
                                    <img src={post.img} alt="post" className="card-img-top" />                                    
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.desc}</p>
                                    <Link to={`/edit/${post.id}`} className="btn btn-sm mx-1 btn-success rounded-3">Edit</Link>
                                    <button onClick={() => deleteposts(post.id)} className="btn btn-sm mx-1 btn-danger rounded-3">Delete</button>
                                </div>
                            </div>
                        ))
                ) : (
                    <p>No Posts </p>
                )}
            </section>
            </div>
        </>
    );
}

export default Home;
