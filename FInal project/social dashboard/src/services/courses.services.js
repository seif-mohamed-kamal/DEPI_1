import axios from "axios";
const url = `http://localhost:3000/posts`;

// Get All courses
export async function getposts() {
    return await axios.get(url);
}

// Add a new course
export async function addpost(post) {
    return await axios.post(url, post);
}

// Get a single course by ID
export async function getpost(id) {
    return await axios.get(`${url}/${id}`);
}

//Update course
export async function updatepost( id , post) {
    return await axios.put(`${url}/${id}` , post);
}

//Delete Course
export async function deletepost(id) {
    return await axios.delete(`${url}/${id}`);
}
