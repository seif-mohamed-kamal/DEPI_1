import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getpost, updatepost } from "../../services/courses.services";
import Swal from "sweetalert2";

function Edit() {
    const id  = useParams().id;
    const navigate = useNavigate();

    const [post, setpost] = useState({
        id: id,
        title: "",
        desc: "",
        img: ""
    });

    useEffect(() => {
        getpost(id)
            .then(res => setpost(res.data));
    }, [id]);

    const editpost = (event) => {
        event.preventDefault();
        if (!post.title || !post.desc || !post.img) {
            Swal.fire({
                text: "All Inputs Required",
                icon: "warning",
                title: "Missing Fields"
            });
        } else {
            updatepost(id, post)
                .then(() => {
                    Swal.fire({
                        text: "Product Updated successfully",
                        icon: "success",
                        title: "Well done"
                    });
                    navigate("/home");
                });
        }
    };

    return (
        <>
            <h1 className="bg-dark py-3 text-white fs-5 text-center mt-2">Edit post</h1>
            <section className="container w-50 mx-auto my-5">
                <form onSubmit={editpost}>
                    <div className="form-group my-2">
                        <label htmlFor="title" className="fw-bolder">Post Title</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            value={post.title}
                            onChange={e => setpost({ ...post, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="desc" className="fw-bolder">Post Description</label>
                        <textarea
                            id="desc"
                            className="form-control"
                            value={post.desc}
                            onChange={e => setpost({ ...post, desc: e.target.value })}
                        />
                    </div>
                    {/* <div className="form-group my-2">
                        <label htmlFor="img" className="fw-bolder">Upload Photo</label>
                        <input
                            type="file"
                            id="img"
                            className="form-control"
                            value={post.img}
                            onChange={e => setpost({ post, img: e.target.files[0] })}
                        />
                    </div> */}
                    <input type="submit" value="Edit Course" className="btn btn-dark my-2" />
                </form>
            </section>
        </>
    );
}

export default Edit;
