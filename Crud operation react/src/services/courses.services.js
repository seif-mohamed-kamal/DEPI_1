import axios from "axios";
const url = "http://localhost:3000/courses";

// Get All courses
export async function getcourses() {
    return await axios.get(url);
}

// Add a new course
export async function addcourse(course) {
    return await axios.post(url, course);
}

// Get a single course by ID
export async function getbook(id) {
    return await axios.get(`${url}/${id}`);
}

//Update course
export async function updatebook( id , course) {
    return await axios.put(`${url}/${id}` , course);
}

//Delete Course
export async function deletebook(id) {
    return await axios.delete(`${url}/${id}`);
}
