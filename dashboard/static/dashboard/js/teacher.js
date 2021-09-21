import { getTeacher, getCourse, postDataThroughApi, deleteConfirm, getEvaluation } from "./api_method.mjs";


const full_name_field = document.querySelector('#id_full_name');
full_name_field.classList += 'form-control';
full_name_field.setAttribute('required', 'true');
const qualification_field = document.querySelector('#id_qualification');
qualification_field.classList += 'form-control';
qualification_field.setAttribute('required', 'true');
const status_field = document.querySelector('#id_status');
status_field.classList += 'form-control';
status_field.setAttribute('required', 'true');


const fetchData = async() => {

    // Get teachers through the api
    let teachers = [];
    await getTeacher().then(res => {
        teachers = res;
    });

    // Get courses through the api
    let courses = [];
    await getCourse().then(res => {
        courses = res;
    });

    // Get evaluations through the api
    let evaluations = [];
    await getEvaluation().then(res => {
        evaluations = res;
    });

    // Get total response values through the api
    let url = 'http://localhost:8000/api/total-response-values/';
    let res = await fetch(url);
    const total = await res.json();


    let teacherContentTag = document.querySelector("#teacher-content");
    let courseContentTag = document.querySelector("#course-content");


    // All functions
    // *******************************************

    const setTeacher = teachers => {

        for (let index = 0; index < teachers.length; index++) {
            const teacher = teachers[index];

            let liTeacher = document.createElement("li");
            liTeacher.classList = "teacher list-group-item d-flex hover justify-content-between align-items-start";
            liTeacher.id = teacher.id;
            liTeacher.textContent = teacher.full_name;

            let ctnr = document.createElement('div');
            ctnr.className = "float-end";

            let edit_btn = document.createElement('button');
            edit_btn.classList = "btn btn-add edit btn-sm px-3 me-2 rounded-pill list-group-item-secondary";
            edit_btn.id = `${teacher.id}`;
            edit_btn.innerText = '!';
            edit_btn.setAttribute('data-bs-toggle', 'modal');
            edit_btn.setAttribute('data-bs-target', '#teacherModal');

            let delete_btn = document.createElement('button');
            delete_btn.classList = "btn btn-add delete btn-sm px-3 rounded-pill list-group-item-danger";
            delete_btn.id = `${teacher.id}`;
            delete_btn.innerText = 'X';

            let span = document.createElement("span");
            span.innerText = `${teacher.status}`;
            span.classList = "badge list-group-item-info rounded-pill me-2";

            ctnr.appendChild(span);
            ctnr.appendChild(edit_btn);
            ctnr.appendChild(delete_btn);

            liTeacher.appendChild(ctnr);

            teacherContentTag.appendChild(liTeacher);
            
        }
        
    }

    const getPourcentCourse = (course_id) => {

        let marks = 0;
        let count = 0;

        for (let index = 0; index < evaluations.length; index++) {
            const evaluation = evaluations[index];
            if (evaluation.course === course_id) {
                marks += evaluation.mark;
                count += 1;
            }
        }

        let result = ((marks/count)*100)/total;

        return result.toFixed(0);
    }

    // *******************************************
    // End functions


    // Main code
    // *******************************************

    setTeacher(teachers);

    // Teacher editing
    // --------------------
    let editBtns = document.querySelectorAll('.edit');
    const saveBtn = document.querySelector('#save-btn');


    for (let index = 0; index < editBtns.length; index++) {
        const element = editBtns[index];

        element.addEventListener('click', async (e) => {
            saveBtn.textContent = 'Modifier';
            saveBtn.value = element.id;
            let teacher = {};
            await getTeacher(Number(e.target.id)).then(res => {
                teacher = res;
            });
            full_name_field.value = `${teacher.full_name}`;
            qualification_field.value = `${teacher.qualification}`;
            status_field.value = `${teacher.status}`;
        });
    }


    // Response deletion
    // --------------------
    let deleteBtns = document.querySelectorAll('.delete');

    for (let index = 0; index < deleteBtns.length; index++) {
        const element = deleteBtns[index];

        element.addEventListener('click', async (e) => {
            deleteConfirm('http://localhost:8000/api/teacher/', Number(e.target.id));
        });
    }

    // *******************************************
    // End main code


    // All event listers
    // *******************************************
    let teacherList = document.querySelectorAll(".teacher");


    for (let index = 0; index < teacherList.length; index++) {
        const teacher = teacherList[index];


        teacher.addEventListener("click", (e) => {
            e.preventDefault();

            let marks = 0;
            let count = 0;
            let result = 0;

            courseContentTag.innerHTML = '';

            for (let index = 0; index < courses.length; index++) {
                const course = courses[index];
                
                if (course.teacher === Number(teacher.id)) {

                    for (let index = 0; index < evaluations.length; index++) {
                        const element = evaluations[index];

                        if (course.id === element.course) {
                            marks += element.mark;
                            count += 1;
                        }

                    }

                    let liCourse = document.createElement("li");
                    liCourse.classList = "teacher list-group-item d-flex hover justify-content-between align-items-start";
                    liCourse.id = course.id;
                    liCourse.textContent = course.label;
                    let span = document.createElement("span");
                    
                    const num = getPourcentCourse(course.id);
                    if (num > 0) {
                        span.innerText = `${num} % d'évaluation`;
                        if (num < 50) {
                            span.classList = "badge list-group-item-danger rounded-pill";
                        }else if (num >= 50 && num <75) {
                            span.classList = "badge list-group-item-warning rounded-pill";
                        }else {
                            span.classList = "badge list-group-item-success rounded-pill";
                        }
                    }else {
                        span.innerText = '0 %';
                        span.classList = "badge list-group-item-danger rounded-pill";
                    }
                    
                    liCourse.appendChild(span);
                    courseContentTag.appendChild(liCourse);

                }
            }

            const pourcentageTag = document.querySelector('#pourcent');

            if (marks > 0) {
                result = (((marks/count)*100)/total).toFixed(0);

                if (result < 50 && pourcentageTag.parentElement.parentElement
                    .classList.contains('list-group-item-light')) {
                    pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-light', 'list-group-item-danger');
                }else if (result < 50 && pourcentageTag.parentElement.parentElement
                    .classList.contains('list-group-item-warning')) {
                        pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-warning', 'list-group-item-danger');
                }else if (result < 50 && pourcentageTag.parentElement.parentElement
                    .classList.contains('list-group-item-success')) {
                        pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-success', 'list-group-item-danger');
                }else if (result >= 50 && result < 75 && pourcentageTag.parentElement.parentElement
                    .classList.contains('list-group-item-light')) {
                    pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-light', 'list-group-item-warning');
                }else if (result >= 50 && result < 75 && pourcentageTag.parentElement.parentElement
                    .classList.contains('list-group-item-success')) {
                    pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-success', 'list-group-item-warning');
                }else if (result >= 50 && result < 75 && pourcentageTag.parentElement.parentElement
                    .classList.contains('list-group-item-danger')) {
                    pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-danger', 'list-group-item-warning');
                }else if (result >= 75 && pourcentageTag.parentElement.parentElement
                    .classList.contains('list-group-item-danger')) {
                    pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-danger', 'list-group-item-success');
                }else if (result >= 75 && pourcentageTag.parentElement.parentElement
                    .classList.contains('list-group-item-warning')) {
                    pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-warning', 'list-group-item-success');
                }else if (result >= 75 && pourcentageTag.parentElement.parentElement
                    .classList.contains('list-group-item-light')) {
                    pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-light', 'list-group-item-success');
                }

                pourcentageTag.innerText = `${result} % en moyenne`;

            }else if (marks == 0 && pourcentageTag.parentElement.parentElement
                .classList.contains('list-group-item-light')) {
                pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-light', 'list-group-item-danger');
                document.querySelector('#pourcent').innerText = `0 %`;
            }else if (marks == 0 && pourcentageTag.parentElement.parentElement
                .classList.contains('list-group-item-warning')) {
                pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-warning', 'list-group-item-danger');
                document.querySelector('#pourcent').innerText = `0 %`;
            }else if (marks == 0 && pourcentageTag.parentElement.parentElement
                .classList.contains('list-group-item-success')) {
                pourcentageTag.parentElement.parentElement.classList.replace('list-group-item-success', 'list-group-item-danger');
                document.querySelector('#pourcent').innerText = `0 %`;
            }else if (marks == 0 && pourcentageTag.parentElement.parentElement
                .classList.contains('list-group-item-danger')) {
                document.querySelector('#pourcent').innerText = `0 %`;
            }

        });
    }

    document.querySelector('.add-teacher').addEventListener('click', (e) => {
        full_name_field.value = '';
        qualification_field.value = '';
        status_field.value = '';
    });

    document.querySelector('#teacherModal').addEventListener('submit', async (e) => {
        const teacher = {};

        teacher[full_name_field.name] = full_name_field.value;
        teacher[qualification_field.name] = qualification_field.value;
        teacher[status_field.name] = status_field.value;

        if (saveBtn.textContent == 'Modifier') {
            let id = Number(saveBtn.value);
            await postDataThroughApi('http://localhost:8000/api/teacher/'+id+'/', teacher, 'PUT');
        }else {
            await postDataThroughApi('http://localhost:8000/api/teacher/', teacher);
        }
    });

    // *******************************************
    // End event listener

}

window.addEventListener('DOMContentLoaded', () => fetchData());