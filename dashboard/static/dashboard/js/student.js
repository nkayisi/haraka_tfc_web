import { postDataThroughApi, getStudent, getFaculty, getPromotion, deleteConfirm } from "./api_method.mjs";

const matricule = document.querySelector('#id_matricule');
matricule.classList += 'form-control';
const faculty = document.querySelector('#id_faculty');
faculty.classList += 'form-control cursor'
const promotion = document.querySelector('#id_promotion');
promotion.classList += 'form-control cursor';

const fetchData = async() => {

    let students = [];
    await getStudent().then(result => {
        students = result;
    });

    let faculties = [];
    await getFaculty().then(result => {
        faculties = result;
    });

    let promotions = [];
    await getPromotion().then(result => {
        promotions = result;
    });

    let studentContentTag = document.querySelector("#student-content");


    // All functions
    // *******************************************

    const setStudent = studentArray => {
        for (let index = 0; index < studentArray.length; index++) {
            const student = studentArray[index];

            let faculty = '';
            let promotion = '';

            for (let index = 0; index < faculties.length; index++) {
                const fac = faculties[index];

                if (student.faculty == fac.id) {
                    faculty = fac.fac_label;
                }
                
            }

            for (let index = 0; index < promotions.length; index++) {
                const prom = promotions[index];

                if (student.promotion == prom.id) {
                    promotion = prom.label;
                }
            }
   

            let rowTable = `
                <tr> <td>${student.matricule}</td> <td>${faculty}</td> <td>${promotion}</td> 
                <td> <div class="float-end">
                    <button class="btn btn-add edit btn-sm px-3 me-2 rounded-pill list-group-item-secondary" 
                    id="${student.id}" data-bs-toggle="modal" data-bs-target="#studentModal">!</button>
                    <button class="btn btn-add delete btn-sm px-3 rounded-pill list-group-item-danger" 
                    id="${student.id}">X</button>
                </div> </td> </tr>
            `;            
                    
            studentContentTag.innerHTML += rowTable;

        }
    }

    // *******************************************
    // End functions


    // Main code
    // *******************************************

    setStudent(students);
    
    // student editing
    // --------------------
    let editBtns = document.querySelectorAll('.edit');
    const saveBtn = document.querySelector('#save-btn');

    for (let index = 0; index < editBtns.length; index++) {
        const element = editBtns[index];

        element.addEventListener('click', async (e) => {
            saveBtn.textContent = 'Modifier';
            saveBtn.value = element.id;
            let student = {};
            await getStudent(Number(e.target.id)).then(res => {
                student = res;
            });
            matricule.value = `${student.matricule}`;
            faculty.value = `${student.faculty}`;
            promotion.value = `${student.promotion}`;
        });
    }

    // Question deletion
    // --------------------
    let deleteBtns = document.querySelectorAll('.delete');

    for (let index = 0; index < deleteBtns.length; index++) {
        const element = deleteBtns[index];

        element.addEventListener('click', async (e) => {
            await deleteConfirm('http://localhost:8000/api/student/', Number(e.target.id));
        });
    }

    // *******************************************
    // End main code


    // All event listers
    // *******************************************

    document.querySelector('.add-student').addEventListener('click', (e) => {
        matricule.value = '';
        faculty.value = '';
        promotion.value = '';
    });

    document.querySelector('#addStudentForm').addEventListener('submit', async (e) => {
        const student = {};
        const matricule = document.querySelector('#id_matricule');
        const faculty = document.querySelector('#id_faculty');
        const promotion = document.querySelector('#id_promotion');

        student[matricule.name] = matricule.value;
        student[faculty.name] = faculty.value;
        student[promotion.name] = promotion.value;

        if (saveBtn.textContent == 'Modifier') {
            let id = Number(saveBtn.value);
            await postDataThroughApi('http://localhost:8000/api/student/'+id+'/', student, 'PUT');
        }else {
            await postDataThroughApi('http://localhost:8000/api/student/', student);
        }

    });

    // *******************************************
    // End event listener

}

window.addEventListener('DOMContentLoaded', () => fetchData());