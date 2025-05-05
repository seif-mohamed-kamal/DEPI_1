import axios from "axios";
const url = "http://localhost:3000/Baskets";

// Get All courses
export async function getBaskets() {
    return await axios.get(url);
}

// Add a new course
export async function addBasket(course) {
    return await axios.post(url, course);
}

// Get a single course by ID
export async function getBasket(id) {
    return await axios.get(`${url}/${id}`);
}

//Update course
export async function updateBasket( id , course) {
    return await axios.put(`${url}/${id}` , course);
}

//Delete Course
export async function deleteBasket(id) {
    return await axios.delete(`${url}/${id}`);
}
