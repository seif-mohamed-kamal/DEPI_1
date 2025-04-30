import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addcourse, getbook, updatebook } from "../../services/courses.services";
import Swal from "sweetalert2";

function edit() {
    const id = useParams().id
    const [course , setcourse] = useState({
        id : id,
        title : "",
        price : "",
        instructor : "",
        desc : "",
    })
    useEffect(()=>{
        getbook(id)
        .then(res => setcourse(res.data))
    } , [])
    const navigate = useNavigate();

    const editcourse = (event) =>{
        event.preventDefault()
        if(course.title === "" ||course.price === "" ||
            course.instructor === "" ||course.desc === "" )
            Swal.fire({
                title: "Wrong",
                text: "All Inputs Are required",
                icon: "error"
            });
        else{
            updatebook( id , course )
            .then(() => {Swal.fire({
                title: "Good job!",
                text: "Added Succesfully",
                icon: "success"
            });})
            navigate("/")
        }
    }
    return ( 
        <>
            <h1 className="bg-dark py-3 text-white fs-5 text-center mt-2">Create Course</h1>
            <section className="container w-50 mx-auto my-5">
            <form onSubmit={editcourse}>
                    <div className="form-group my-2">
                        <label htmlFor="title" className="fw-bolder">Course Title</label>
                        <input type="text" id="title" className="form-control"
                        value={course.title}
                        onChange={e => setcourse({...course , title : e.target.value})}/>
                        </div>
                    <div className="form-group my-2">
                        <label htmlFor="price" className="fw-bolder">Course Price</label>
                        <input type="text" id="price" className="form-control"
                        value={course.price}
                        onChange={e => setcourse({...course , price : e.target.value})}/>
                        </div>
                    <div className="form-group my-2">
                        <label htmlFor="instructor" className="fw-bolder">Instructor</label>
                        <input type="text" id="instructor" className="form-control"
                        value={course.instructor}
                        onChange={e => setcourse({...course , instructor : e.target.value})}/>
                        </div>
                    <div className="form-group my-2">
                        <label htmlFor="desc" className="fw-bolder">desc</label>
                        <textarea type="text" id="desc" className="form-control"
                        value={course.desc}
                        onChange={e => setcourse({...course , desc : e.target.value})}></textarea>
                    </div>
                    <input type="submit" value="Edit course" className="btn btn-dark my-2"/>
                </form>
            </section>
        </>
    );
}
export default edit;