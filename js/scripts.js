const randomUsersAPI = 'https://randomuser.me/api/?results=12&inc=name,picture,email,location,cell,dob'; 
const galleryContainer = document.querySelector('#gallery'); 
const searchContainer = document.querySelector('.search-container'); 
const bodyContainer = document.querySelector('body'); 
let employeesList = []; 
//========================
//  Modals Windows
//------------------------
galleryContainer.addEventListener('click', (e) => {
    const employeeName = e.target.closest('.card').lastElementChild.firstElementChild.textContent; 
    //employees = Array.from(employees.results);
    let employeeClicked = employeesList.filter(employee => {
        let currEmployee = employee.name.first + ' ' + employee.name.last;
        if (employeeName === currEmployee) {
            return employee;
        }
    }); 
    console.log(employeeClicked);
    displayEmployeeModal(employeeClicked);
    let btnExit = document.querySelector('#modal-close-btn'); 
    let modalContainer = document.querySelector('.modal-container'); 
    btnExit.addEventListener('click', (e) => {
        modalContainer.hidden = true;
    }); 
    
}); 


function displayEmployeeModal(employee) {
    let employeeHTML = ``;
    employee.map( (person) => 
    { employeeHTML += `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.city}</p>
                <hr>
                <p class="modal-text">(555) 555-5555</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, 
                ${person.location.country} ${person.location.postcode}</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>

        // IMPORTANT: Below is only for exceeds tasks 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    
    `}).join('');
    bodyContainer.insertAdjacentHTML("beforeend", employeeHTML); 

    

};


//========================
//  Fetching Data
//------------------------
async function getEmployees() {
    const response = await fetch(randomUsersAPI); 
    const data = await response.json(); 
    employeesList = data; 
    displayEmployees(data);
    return data; 
}; 

function displayEmployees(employees) {
    employeesList = Array.from(employees.results);
    let employeesHTML = ``;
    employeesList.map( (employee) => 
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