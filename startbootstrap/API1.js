// Function to get the body from API
async function getusers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", { method: "GET" });
    const body = await response.json();
    return body;
}

async function displayusers() {
    const users = await getusers();
    const tbody = document.querySelector('tbody');

    users.forEach(user => {
        // Create a new row for each user
        const row = document.createElement('tr');

        // Set the inner HTML of the row using template literals
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
            <td>${user.phone}</td>
            <td>${user.company.name}</td>
        `;
        // Append the new row to the tbody
        tbody.appendChild(row);
    });
}


// Function to get the body from API
async function getnews() {
    const response = await fetch("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=470aeabc4f694d6d847d98c9e8ec9059");
    const body = await response.json();
    return body.articles;
}

async function displaynews() {
    const news = await getnews();
    const newnews = document.getElementById('news-container');
    news.forEach(nn => {
        const everynew = document.createElement('div');
        everynew.className = 'col-md-6 mx-auto my-8';
        everynew.innerHTML = `
            <div class="card">
                <img src="${nn.urlToImage}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${nn.title}</h5>
                    <p class="card-text">${nn.description}</p>
                    <a href="${nn.url}" class="btn btn-primary">Read more</a>
                </div>
            </div>
        `;
        newnews.appendChild(everynew);
    });
}


document.addEventListener("DOMContentLoaded", displayusers);
document.addEventListener("DOMContentLoaded", displaynews);

