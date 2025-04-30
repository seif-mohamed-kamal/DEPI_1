class course{
    title;
    price;
    instructor;
    desc;
    id;

    constructor(title,price,instructor,desc, id){ 
        this.title=title;
        this.price=price;
        this.instructor=instructor;
        this.desc=desc;
        // new for me 
        this.id = id || crypto.randomUUID(); // Generate unique ID, or use provided
    }
}

class courseui{
    static showCourse(course) {
        const tbody = document.querySelector('tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>${course.instructor}</td>
            <td>${course.desc}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${course.id}">Delete</button>
                <button class="btn btn-success btn-sm edit-btn" data-id="${course.id}">Edit</button>
            </td>
        `;
        tbody.appendChild(tr);
    }

    static addcourse(course) {
        const tbody = document.querySelector('tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>${course.instructor}</td>
            <td>${course.desc}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${course.id}">Delete</button>
                <button class="btn btn-success btn-sm edit-btn" data-id="${course.id}">Edit</button>
            </td>
        `;
        tbody.appendChild(tr);
    }

    static deletecourse(element){
        if(element.classList.contains('delete-btn')){
            const courseId = element.getAttribute('data-id');
            fetch(`http://localhost:3000/courses/${courseId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                console.log('Course deleted:', data);
                element.parentElement.parentElement.remove();
            });
        }
    }

    static editCourse(element) {
        if (element.classList.contains('edit-btn')) {
            const courseId = element.getAttribute('data-id');
            const trToEdit = element.parentElement.parentElement;
            trToEdit.classList.add('edit-mode');
            const title = trToEdit.cells[0].textContent;
            const price = trToEdit.cells[1].textContent;
            const instructor = trToEdit.cells[2].textContent;
            const desc = trToEdit.cells[3].textContent;
            document.querySelector('#editId').value = courseId; 
            document.querySelector('#title').value = title;
            document.querySelector('#price').value = price;
            document.querySelector('#instructor').value = instructor;
            document.querySelector('#desc').value = desc;
            const form = document.querySelector('#courseForm');
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Update Course';
            const cancelButton = document.getElementById('cancelEdit');
            cancelButton.style.display = 'inline-block';
            form.removeEventListener('submit', courseFormSubmitHandler);
            form.addEventListener('submit', handleUpdateCourse);
        }
    }

    static updateCourse(courseId, updatedData) {
        const trToUpdate = document.querySelector(`[data-id="${courseId}"]`).parentElement.parentElement;
        if (trToUpdate) {
            trToUpdate.cells[0].textContent = updatedData.title;
            trToUpdate.cells[1].textContent = updatedData.price;
            trToUpdate.cells[2].textContent = updatedData.instructor;
            trToUpdate.cells[3].textContent = updatedData.desc;
            trToUpdate.classList.remove('edit-mode');
        }
    }

    static clearInputs(){
        document.querySelector('#editId').value = "";
        document.querySelector('#title').value = ""
        document.querySelector('#price').value = ""
        document.querySelector('#instructor').value = ""
        document.querySelector('#desc').value = ""
        const form = document.querySelector('#courseForm');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Add Course';
        const cancelButton = document.getElementById('cancelEdit');
        cancelButton.style.display = 'none';
        form.removeEventListener('submit', handleUpdateCourse);
        form.addEventListener('submit', courseFormSubmitHandler);
    }
}

let courseFormSubmitHandler = (event)=>{ 
    event.preventDefault();
    const title = document.querySelector('#title').value
    const price = document.querySelector('#price').value
    const instructor = document.querySelector('#instructor').value
    const desc = document.querySelector('#desc').value
    const new_course = new course(title, price, instructor, desc)

    fetch('http://localhost:3000/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_course),
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        courseui.addcourse(data);
        courseui.clearInputs();
    });
}
function handleUpdateCourse(event) {
    event.preventDefault();
    const courseId = document.querySelector('#editId').value;
    const updatedTitle = document.querySelector('#title').value;
    const updatedPrice = document.querySelector('#price').value;
    const updatedInstructor = document.querySelector('#instructor').value;
    const updatedDesc = document.querySelector('#desc').value;

    const updatedData = {
        title: updatedTitle,
        price: updatedPrice,
        instructor: updatedInstructor,
        desc: updatedDesc,
    };

    fetch(`http://localhost:3000/courses/${courseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        courseui.updateCourse(courseId, data);
        courseui.clearInputs();
    })
    .catch(error => {
        console.error('Error updating course:', error);
        alert('Failed to update course. Please check the console for details.');
    });
}

const form = document.querySelector('form');
form.addEventListener('submit', courseFormSubmitHandler);

document.querySelector('tbody').addEventListener('click' , (event) =>{
    courseui.deletecourse(event.target);
    courseui.editCourse(event.target);
});

document.getElementById('cancelEdit').addEventListener('click', () => {
    courseui.clearInputs();
});

function loadCourses() {
    fetch('http://localhost:3000/courses')
        .then(response => response.json())
        .then(data => {
            data.forEach(course => courseui.showCourse(course));
        })
        .catch(error => console.error('Error loading courses:', error));
}
document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
});