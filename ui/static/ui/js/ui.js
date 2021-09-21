
const coursesTag = document.querySelector("#courses");
const questionContent = document.querySelector('#questionContent');
const formSendContent = document.querySelector('#formSend');

const courseTitle = document.querySelector('#course-title');
courseTitle.setAttribute('style', 'display:none');

questionContent.setAttribute('style', 'display:none');
formSendContent.setAttribute('style', 'display:none');

let question = document.querySelector('#questionsLabel');
let titleEvaluation = document.querySelector("#title");
let pager = document.querySelector('#pager');


const commentField = document.querySelector('#id_comment');
commentField.classList += ' form-control mx-auto area_fixed';
commentField.setAttribute('placeholder', 'Veillez tapez votre commentaire ici !');



const fetchData = async () =>{

    const matricule = Number(window.location.search.split("=")[1]);
    let student = {};
    let courses = new Set();


    // Get student through the api
    let url = 'http://localhost:8000/api/student/';
    let res = await fetch(url);
    const students = await res.json()

    
    for (let index = 0; index < students.length; index++) {
        const element = students[index];
        if (element.matricule == matricule) {
            student = element;
        }
    }


    // Get course through the api
    url = 'http://localhost:8000/api/course/';
    res = await fetch(url);
    const courses_draft = await res.json()


    for (let index = 0; index < courses_draft.length; index++) {
        const element = courses_draft[index];
        if (element.faculty == student.faculty && element.promotion == student.promotion) {
            courses.add(element);
        }
    }


    // Get evaluation through the api
    url = 'http://localhost:8000/api/evaluation/';
    res = await fetch(url);
    const evaluations = await res.json();




    courses.forEach(course => {

        for (let index = 0; index < evaluations.length; index++) {
            const element = evaluations[index];

            if (course.id == element.course && element.student == student.id) {
                courses.delete(course);
            }
            
        }
    });



    // Get questions through the api
    url = 'http://localhost:8000/api/question/';
    res = await fetch(url);
    const questions = await res.json();

    // Get responses through the api
    url = 'http://localhost:8000/api/response/';
    res = await fetch(url);
    const responses = await res.json();

    // GLOBAL VARIABLES
    let numero = 0;
    let listRes = [];
    let value = 0;
    let checkRadioList = [];
    let courseList = [];
    let idEvaluatedCourse = 0;

    // END GLOBAL VARIABLES //


    // const questionContent = document.querySelector('#questions');
    const responseContent = document.querySelector('#responses');
    const nextBtn = document.querySelector('#next');
    const previousBtn = document.querySelector('#previous');



    // FUNCTIONS

    const questionTemplate = index => {

        pager.innerText = `Question : ${index+1} / ${questions.length}`;

        question.innerText = questions[index].question_label;

        responseContent.innerHTML = '';

        responses.forEach(res => {
            let tRes = `
            <div class="form-check">
                <input class="form-check-input ms-5" type="radio" value="${res.value}"
                 name="flexRadioDefault" id="flexRadioDefault${res.value}">
                <label class="form-check-label" for="flexRadioDefault${res.value}">
                ${res.label}
                </label>
            </div>
            `;

            responseContent.innerHTML += tRes;
        });

        checkRadioList = document.querySelectorAll('.form-check-input');

        for (let index = 0; index < checkRadioList.length; index++) {
            const element = checkRadioList[index];
            element.addEventListener('click', () => {
                value = Number(element.value);
                error.setAttribute('style', 'display:none');
            });
        }

    }

    const courseTemplate = () => {

        if (courses.size > 0) {

            courseTitle.setAttribute('style', 'display:block');
            
            courses.forEach(course => {
    
                let a = document.createElement('a');
                let sp = document.createElement('span');
                sp.innerText = course.label;
                a.appendChild(sp);
                a.id = course.id;
                a.classList = "course list-group-item list-group-item-action d-flex justify-content-between align-items-start";
                let span = document.createElement("span");
                span.innerText = `${course.hours} heures`;
                span.classList = "badge list-group-item-primary rounded-pill";
                a.appendChild(span);
                coursesTag.appendChild(a);
    
            });
    
            courseList = document.querySelectorAll('.course');
            for (let index = 0; index < courseList.length; index++) {
                const element = courseList[index];
                element.addEventListener('click', (e) => {
    
                    questionContent.setAttribute('style', 'display:block');
                    coursesTag.setAttribute('style', 'display:none');
                    idEvaluatedCourse = Number(element.id);
                });
            }
        
        }else {
            let subTitle = document.createElement('h5');
            subTitle.innerText = "Cher étudiant, vous n'avez pas des cours disponoble pour l'évaluation, veillez revenir plus tard !";
            subTitle.classList = "text-center mt-5";

            let btn = `<a href="/" class="btn btn-outline-info list-group-item-info m-5">Acceuil</a>`;

            courseTitle.parentElement.appendChild(subTitle);
            courseTitle.parentElement.innerHTML += btn;
        }
    }


    const getCookie = name => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const postDataThroughApi = async (url, data) => {

        let csrftoken = getCookie('csrftoken');
    
        const rawResponse = await fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify(data)
        });
    
        return rawResponse.json();
    }

    // END FUNCTIONS //


    // MAIN CODE
    // ****************************************

    courseTemplate();

    questionTemplate(numero);

    previousBtn.setAttribute('disabled', 'true');
   

    let error = document.createElement('li');
    error.classList = "list-group-item list-group-item-danger mx-auto text-center";
    error.id = "error";
    error.innerText = 'Veillez selectionner une reponse avant de passer à la question suivante !';
    pager.parentElement.firstElementChild.appendChild(error);

    error.setAttribute('style', 'display:none');


    // ****************************************
    // END MAIN CODE


    // EVENT LISTENER 
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (numero < questions.length && value > 0) {
            if (numero >= 0) {
                previousBtn.removeAttribute('disabled');
            }
            listRes.push(value);
            console.log(value);
            value = 0;
            if (numero < questions.length-1) {
                numero += 1;
                questionTemplate(numero);
            }else {
                console.log(listRes);
                formSendContent.setAttribute('style', 'display:block');
                questionContent.setAttribute('style', 'display:none');
            }
        }else if (value == 0) {
            error.setAttribute('style', 'display:block');
        }
    });

    previousBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (listRes.length > 0) {

            if (listRes.length == 1) {
                previousBtn.setAttribute('disabled', 'true');
            }
            
            value = listRes.pop();
            if (numero > 0) {
                numero -= 1;
                if (numero >= 0) {
                    questionTemplate(numero);
                    checkRadioList.forEach(r => {
                        if (r.value == value) {
                            r.checked = true;
                        }
                    });
                }
            }
        }else {
            previousBtn.setAttribute('disabled', 'true');
        }

    });

    document.querySelector('#evaluationSaveForm').addEventListener('submit', async (e) => {
        // e.preventDefault();

        const commentValue = commentField.value;

        let evaluation = 0;
        listRes.forEach(el => {
            evaluation += el;
        });

        let evaluationData = {
            student: student.id,
            course: idEvaluatedCourse,
            mark: evaluation,
        }
        // post evaluation data
        await postDataThroughApi('http://localhost:8000/api/evaluation/', evaluationData).then(res => {

            if (commentValue != '') {
                
                const commentData = {
                    course: idEvaluatedCourse,
                    comment: commentValue,
                }
                // post comment data
                postDataThroughApi('http://localhost:8000/api/comments/', commentData);
            }

        });


    });

    // END EVENT LISTENER //
}


window.addEventListener('DOMContentLoaded', () => fetchData());

