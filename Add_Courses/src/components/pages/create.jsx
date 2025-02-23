import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addcourse } from "../../services/courses.services";
import Swal from "sweetalert2";

function create() {
    const [course , setCourse] = useState({
        title : "",
        price : "",
        instructor : "",
        desc : "",
    })
    const navigate = useNavigate();
    const createnewcourse = (event ) =>{
        event.preventDefault();
        if(course.title === "" ||course.price === "" ||
            course.instructor === "" ||course.desc === "" )
            Swal.fire({
                title: "Wrong",
                text: "All Inputs Are required",
                icon: "error"
            });
            else{
                addcourse(course)
                .then(()=>{
                    Swal.fire({
                        title: "Good job!",
                        text: "Added Succesfully",
                        icon: "success"
                    });
                    navigate("/");
                })
            }
    }
    return ( 
        <>
            <h1 className="bg-dark py-3 text-white fs-5 text-center mt-2">Create Course</h1>
            <section className="container w-50 mx-auto my-5">
            <form onSubmit={createnewcourse}>
                    <div className="form-group my-2">
                        <label htmlFor="title" className="fw-bolder">Course Title</label>
                        <input type="text" id="title" className="form-control"
                        onChange={e => setCourse({...course , title : e.target.value})}/>
                        </div>
                    <div className="form-group my-2">
                        <label htmlFor="price" className="fw-bolder">Course Price</label>
                        <input type="text" id="price" className="form-control"
                        onChange={e => setCourse({...course , price : e.target.value})}/>
                        </div>
                    <div className="form-group my-2">
                        <label htmlFor="instructor" className="fw-bolder">Instructor</label>
                        <input type="text" id="instructor" className="form-control"
                        onChange={e => setCourse({...course , instructor : e.target.value})}/>
                        </div>
                    <div className="form-group my-2">
                        <label htmlFor="desc" className="fw-bolder">desc</label>
                        <textarea type="text" id="desc" className="form-control"
                        onChange={e => setCourse({...course , desc : e.target.value})}></textarea>
                    </div>
                    <input type="submit" value="Add course" className="btn btn-dark my-2"/>
                </form>
            </section>
        </>
    );
}
export default create;