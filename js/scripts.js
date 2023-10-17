const randomUsersAPI = 'https://randomuser.me/api/?results=12&inc=name,picture,email,location,cell,dob&nat=us'; 
const galleryContainer = document.querySelector('#gallery'); 
const searchContainer = document.querySelector('.search-container'); 
const bodyContainer = document.querySelector('body'); 
let searchInput; 
let searchBtn; 
let modalContainer; 
let btnExit;
let btnLPrev; 
let btnNext; 
let employeeClicked;
let employeesList = []; 

//========================
//  Fetching Data
//------------------------
/**
 * getEmloyees() fetches data from the API url and converts data to json format. 
 */
async function getEmployees() {
    try {
        const response = await fetch(randomUsersAPI); 
        if(!response.ok) throw new Error('Something went wrong');
        const data = await response.json(); 
        employeesList = data.results;
        displayEmployees(employeesList);
        return data; 
    } catch (err) {
        // catches and logs an error 
        console.log('Looks like there was a problem', err); 
    } 
}; 

//========================
//  Displaying Data
//------------------------
/**
 * displayEmployees() uses the list of employees received to display a gallery
 * of employees to the DOM. 
 * @param {*} employees - receives a list of emloyees to display 
 */
function displayEmployees(employees) {
    let employeesHTML = ``;
    // maps through the list of employees to create card containers 
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
};
/**
 * displayEmployeeModal() receives an employee that was selected to display
 * a modal containing information about the employee. 
 * @param {*} employee - an employee Object containing information like email,
 *  location, picture, etc. 
 */
function displayEmployeeModal(employee) {
    const dob = new Date(employee.dob.date);
    const employeeHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.cell}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, 
                ${employee.location.country} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${dob.getMonth()+1}/${dob.getDate()}/${dob.getFullYear()}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;
    /*
    employee.map( (person) => 
    {   
        const dob = new Date(person.dob.date); 
        employeeHTML += `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.city}</p>
                <hr>
                <p class="modal-text">${person.cell}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, 
                ${person.location.country} ${person.location.postcode}</p>
                <p class="modal-text">Birthday: ${dob.getMonth()+1}/${dob.getDate()}/${dob.getFullYear()}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    
    `}).join('');
    */
    bodyContainer.insertAdjacentHTML("beforeend", employeeHTML); 

    btnExit = document.querySelector('#modal-close-btn'); 
    modalContainer = document.querySelector('.modal-container'); 
    btnExit.addEventListener('click', (e) => {
        modalContainer.remove();
    });
    
};

//========================
//  Modal Event Listeners 
//------------------------
galleryContainer.addEventListener('click', (e) => {
    const employeeCard = e.target.closest('.card');
    if (employeeCard !== null) {
        const employeeName = employeeCard.querySelector('#name').textContent;
        employeeClicked = employeesList.filter(employee => {
            let currEmployee = employee.name.first + ' ' + employee.name.last;
            if (employeeName === currEmployee) {
                return employee;
            }
        }); 
        employeeClicked = employeeClicked[0];
        displayEmployeeModal(employeeClicked);
    }

});

//========================
//  Search Bar Extra Credit
//------------------------

function addSearchBar() {
    displayBar(); 
    searchInput = document.querySelector('.search-input'); 
    searchBtn = document.querySelector('.search-submit'); 
    searchInput.addEventListener('keyup', () => {
        searchEmployee(searchInput);
     });
    searchBtn.addEventListener('click', () => {
        searchEmployee(searchInput);
     });
};

function searchEmployee(element) {
    const nameMatches = []; 
    const name = element.value.toLowerCase(); 
    employeesList.forEach(person => {
        let currPerson = person.name.first + ' ' + person.name.last;
        currPerson = currPerson.toLowerCase(); 
        if (currPerson.includes(name)) {
            nameMatches.push(person);
        }
    }); 
    if (nameMatches.length > 0) {
        displayEmployees(nameMatches);
    } else {
        galleryContainer.innerHTML = '<h3>No results found.</h3>'; 
    }
};

function displayBar() {
    const searchHTML = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`; 
    searchContainer.innerHTML = searchHTML; 
}; 

addSearchBar(); 
getEmployees(); 