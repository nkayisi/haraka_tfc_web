import { getFaculty, getPromotion, getTeacher, getCourse, deleteConfirm, postDataThroughApi } from "./api_method.mjs";


const courseTitle = document.querySelector("#id_label");
courseTitle.classList += 'form-control';
const hours = document.querySelector("#id_hours");
hours.classList += 'form-control';
const faculty = document.querySelector("#id_faculty");
faculty.classList += 'form-control cursor';
const promotion = document.querySelector("#id_promotion");
promotion.classList += 'form-control cursor';
const teacher = document.querySelector("#id_teacher");
teacher.classList += 'form-control cursor';

const name = document.querySelector("#id_full_name");
name.classList += 'form-control';
const qualification = document.querySelector("#id_qualification");
qualification.classList += 'form-control cursor';
const status = document.querySelector("#id_status");
status.classList += 'form-control cursor';


const fetchData = async() => {


    // Get courses through the api
    let courses = [];
    await getCourse().then(res => {
        courses = res;
    });

    // Get teachers through the api
    let teachers = [];
    await getTeacher().then(res => {
        teachers = res;
    });

    // Get faculties through the api
    let faculties = [];
    await getFaculty().then(res => {
        faculties = res;
    });

    // Get promotions through the api
    let promotions = [];
    await getPromotion().then(res => {
        promotions = res;
    });

    // Get principal container for the dashboard
    let evaluatedCourseTag = document.querySelector("#evaluated-course");


    let courseContentTag = document.querySelector("#course-content");

    const csrftoken = document.querySelector('input[name="csrfmiddlewaretoken"]').value

    
    let newTeacherContentInfo = document.querySelector("#new-teacher-info");
    let oldTeacherContentInfo = document.querySelector("#old-teacher-info");

    const radio1 = document.querySelector("#flexRadioDefault1");
    const radio2 = document.querySelector("#flexRadioDefault2");

    // All functions
    // *******************************************

    const setCourse = array => {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            let teacher = {};
            let faculty = {};
            let promotion = {};

            for (let index = 0; index < teachers.length; index++) {
                const el = teachers[index];
                if (element.teacher === el.id) {
                    
                    teacher = el;
                }
            }

            for (let index = 0; index < faculties.length; index++) {
                const el = faculties[index];
                if (element.faculty === el.id) {
                    
                    faculty = el;
                }
            }

            for (let index = 0; index < promotions.length; index++) {
                const el = promotions[index];
                if (element.promotion === el.id) {
                    
                    promotion = el;
                }
            }

            let textIsEvaluated = '';
            let classList = '';

            if (element.evaluated) {
                textIsEvaluated = 'Déjà évalué';
                classList = "badge list-group-item-success rounded-pill";
            }else {
                textIsEvaluated = 'Non évalué';
                classList = "badge list-group-item-danger rounded-pill";
            }

            let template = `
                <div class="accordion-item">

                    <h2 class="accordion-header focusList" id="flush-heading${element.id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${element.id}" aria-expanded="false" aria-controls="flush-collapse${element.id}">
                            ${element.label}
                        </button>
                    </h2>

                    <div id="flush-collapse${element.id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${element.id}" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body bg-light">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Titre du course :     <span class="grey">${element.label}</span></li>
                            <li class="list-group-item">Nombre d'heures :     <span class="grey">${element.hours} heures</span></li>
                            <li class="list-group-item">Faculté :     <span class="grey">${faculty.fac_label}</span></li>
                            <li class="list-group-item">Promotion :     <span class="grey">${promotion.label}</span></li>
                            <li class="list-group-item">Etat d'évaluation :    
                                <span class="${classList}">${textIsEvaluated}</span>
                            </li>
                            <li class="list-group-item">
                                Enseignant du cours :  <span class="grey">${teacher.full_name}</span>
                            </li>
                            <li class="list-group-item">
                                Qualification de l'enseignant : <span class="grey">${teacher.qualification}</span>
                            </li>
                            <div class="mx-auto mt-3">
                                <button value=${element.id} class="btn btn-sm edit-course mx-2 rounded-pill list-group-item-secondary" 
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    Modifier
                                </button>
                                <button value=${element.id} class="btn btn-sm delete-course mx-2 rounded-pill list-group-item-danger">
                                    Supprimer
                                </button>
                            </div>
                        </ul>
                        </div>
                    </div>
                </div>
            `;

            courseContentTag.firstElementChild.innerHTML += template;
        }
    }


    // *******************************************
    // End functions


    // Main code
    // *******************************************

    setCourse(courses);

    radio1.checked = true;
    radio2.checked = false;
    newTeacherContentInfo.setAttribute("style", "display: none;");
    oldTeacherContentInfo.setAttribute("style", "display: block;");

    // course editing
    // --------------------
    let editBtns = document.querySelectorAll('.edit-course');
    const saveBtn = document.querySelector('#save-btn');

    for (let index = 0; index < editBtns.length; index++) {
        const element = editBtns[index];

        element.addEventListener('click', async (e) => {

            saveBtn.textContent = 'Modifier';
            saveBtn.value = element.value;

            let course = {};
            await getCourse(Number(e.target.value)).then(res => {
                course = res;
            });
            courseTitle.value = `${course.label}`;
            hours.value = `${course.hours}`;
            faculty.value = `${course.faculty}`;
            promotion.value = `${course.promotion}`;
            teacher.value = `${course.teacher}`;
        });
    }


     // Course deletion
    // --------------------
    let delete_courseBtns = document.querySelectorAll('.delete-course');

    for (let index = 0; index < delete_courseBtns.length; index++) {
        const element = delete_courseBtns[index];

        element.addEventListener('click', async (e) => {
            await deleteConfirm('http://localhost:8000/api/course/', Number(e.target.value));
        });
    }

    // Course deletion
    // --------------------
    let edit_courseBtns = document.querySelectorAll('.edit-course');


    // *******************************************
    // End main code



    // All event listers
    // *******************************************

    radio1.addEventListener("click", (e) => {
        newTeacherContentInfo.setAttribute("style", "display: none;");
        oldTeacherContentInfo.setAttribute("style", "display: block;");
    });

    radio2.addEventListener("click", (e) => {
        newTeacherContentInfo.setAttribute("style", "display: block;");
        oldTeacherContentInfo.setAttribute("style", "display: none;");
    });

    document.querySelector('.add-course').addEventListener('click', (e) => {
        courseTitle.value = '';
        hours.value = '';
        faculty.value = '';
        promotion.value = '';
        teacher.value = '';
        name.value = '';
        qualification.value = '';
        status.value = '';
    });

    // Data form submitting
    document.querySelector("form").addEventListener("submit", async (e) => {
        // e.preventDefault();
        let course = {};
        let teacherObj = {};
        

        course[courseTitle.name] = courseTitle.value;
        course[hours.name] = hours.value;
        course[faculty.name] = faculty.value;
        course[promotion.name] = promotion.value;


        if (radio1.checked) {
            
            course[teacher.name] = teacher.value;

            if (saveBtn.textContent == 'Modifier') {
                let id = Number(saveBtn.value);
                await postDataThroughApi('http://localhost:8000/api/course/'+id+'/', course, 'PUT');
            }else {
                await postDataThroughApi('http://localhost:8000/api/course/', course);
            }

        }else {
            teacherObj[name.name] = name.value;
            teacherObj[qualification.name] = qualification.value;
            teacherObj[status.name] = status.value;

            await postDataThroughApi("http://localhost:8000/api/teacher/", teacherObj).then(res => {
                course[teacher.name] = res.id;
                if (saveBtn.textContent == 'Modifier') {
                    let id = Number(saveBtn.value);
                    postDataThroughApi('http://localhost:8000/api/course/'+id+'/', course, 'PUT');
                }else {
                    postDataThroughApi('http://localhost:8000/api/course/', course);
                }
            });
        }

    });

}


window.addEventListener('DOMContentLoaded', () => fetchData());