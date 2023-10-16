const randomUsersAPI = 'https://randomuser.me/api/?results=12&inc=name,picture,email,location'; 
const galleryContainer = document.querySelector('#gallery'); 
const searchContainer = document.querySelector('.search-container'); 
const bodyContainer = document.querySelector('body'); 
let employees = []; 

//========================
//  Modals Windows
//------------------------








//========================
//  Fetching Data
//------------------------
async function getEmployees() {
    const response = await fetch(randomUsersAPI); 
    const data = await response.json(); 
    employees = data; 
    displayEmployees(data);
    return data; 
}; 

function displayEmployees(employees) {
    employees = Array.from(employees.results);
    let employeesHTML = ``;
    employees.map( (employee) => 
    { employeesHTML += `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>
    
    `}).join('');
    galleryContainer.innerHTML = employeesHTML;
    //console.log(employeesHTML);
};
getEmployees(); 