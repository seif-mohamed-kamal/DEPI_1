import { useEffect, useState } from "react";
import { getcourses } from "../../services/courses.services";
import { Link } from "react-router-dom";
import { deletebook } from "../../services/courses.services";
import Swal from "sweetalert2";

function Home() {
const [courses, setCourses] = useState([]);

useEffect(() => {
    getcourses()
    .then((res) => setCourses(res.data));
    }, [courses]);

const deletecourse = (id) =>{
    deletebook(id)
    .then(() => {Swal.fire({
        title: "Good job!",
        text: "Deleted Succesfully",
        icon: "success"
    });})
}
    return (
        <>
        <h1 className="bg-dark py-3 text-white fs-5 text-center mt-2">Home</h1>
        <section className="my-5 container">
            <table className="table table-bordered table-hover text-center">
                <thead>
                <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Instructor</th>
                <th>Description</th>
                <th>Action</th>
                </tr>
            </thead>
            {
            courses.length &&
            <tbody>
                {
                    courses.map((course, index) => (
                        <tr key={course.id}>
                            <td>{index + 1}</td>
                            <td>{course.title}</td>
                            <td>{course.price}</td>
                            <td>{course.instructor}</td>
                            <td>{course.desc}</td>
                            <td>
                                <Link to={`/${course.id}`} className="btn btn-sm btn-info mx-1">Show</Link>
                                <Link to={`/edit/${course.id}`} className="btn btn-sm btn-success mx-1">Edit</Link>
                                <button onClick={() => deletecourse(course.id)} className="btn btn-sm btn-danger mx-1">Delete</button>
                            </td>
                        </tr>
                    )
                    )
                }
            </tbody>
            }
            </table>
        </section>
        </>
    );
    }

export default Home;
