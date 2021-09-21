

let matriculeError = document.querySelector('.error');
matriculeError.setAttribute('style', 'display:none');


const fetchData = async () => {

// Get students through the api
let url = 'http://localhost:8000/api/student/';
let res = await fetch(url);
const students = await res.json()



const matriculeField = document.querySelector('#id_matricule');


let didMatriculeMatch = false;

// ALL EVENT LISTENERS
// ------------------------- 

document.querySelector('#evaluationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const matricule = matriculeField.value;

    
    for (let index = 0; index < students.length; index++) {
        const student = students[index];

        if (student.matricule ==  matricule) {
            didMatriculeMatch = true;
        }
        
    }

    if (didMatriculeMatch) {
        
        window.location.assign('http://localhost:8000/ui/?matricule='+matricule);

    }else {
        matriculeError.setAttribute('style', 'display:block');
        matriculeError.parentElement.className = 'mb-3';
    }

});



// ------------------------- 
// END EVENT LISTENERS


}


window.addEventListener('DOMContentLoaded', () => fetchData());