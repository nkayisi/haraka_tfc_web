import { postDataThroughApi, getResponse, getQuestion, deleteConfirm } from "./api_method.mjs";
    

const textareas = document.querySelectorAll("textarea");

let questionField = textareas[0];
questionField.classList += " form-control mx-auto area_fixed";
questionField.setAttribute('placeholder', 'Veillez taper la question d\'évaluation ici !');


let responseField = textareas[1];
responseField.classList += " form-control mx-auto area_fixed";
responseField.setAttribute('placeholder', 'Veillez taper la reponse d\'évaluation ici !');

let valueField = document.querySelector('#id_value');
valueField.classList += " form-control mx-auto";
valueField.setAttribute('placeholder', 'Veillez taper la valeur de la reponse en point ici !');

const fetchData = async() => {

    // Get questions through the api
    let questions = [];
    await getQuestion().then(res => {
        questions = res;
    });


    // Get responses through the api
    let responses = [];
    await getResponse().then(res => {
        responses = res;
    });


    let questionContentTag = document.querySelector("#question-content");
    let responseContentTag = document.querySelector("#response-content");

    let saveBtn = document.querySelector('#save-question-btn');
    let save_resBtn = document.querySelector('#save-response-btn');


    // All functions
    // *******************************************

    const setQuestion = array => {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            let liQuestion = document.createElement("li");
            liQuestion.classList = "list-group-item d-flex justify-content-between align-items-start";
            liQuestion.textContent = element.question_label;

            let ctnr = document.createElement('div');
            ctnr.className = "float-end";

            let edit_btn = document.createElement('button');
            edit_btn.classList = "btn btn-add edit btn-sm px-3 me-2 rounded-pill list-group-item-secondary";
            edit_btn.id = `${element.id}`;
            edit_btn.innerText = '!';
            edit_btn.setAttribute('data-bs-toggle', 'modal');
            edit_btn.setAttribute('data-bs-target', '#questionModal');

            let delete_btn = document.createElement('button');
            delete_btn.classList = "btn btn-add delete btn-sm px-3 rounded-pill list-group-item-danger";
            delete_btn.id = `${element.id}`;
            delete_btn.innerText = 'X';

            ctnr.appendChild(edit_btn);
            ctnr.appendChild(delete_btn);

            liQuestion.appendChild(ctnr);

            questionContentTag.appendChild(liQuestion);
        }
    }

    const setResponse = array => {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            let liResponse = document.createElement("li");
            liResponse.classList = "list-group-item d-flex justify-content-between align-items-start";
            liResponse.textContent = element.label;

            let ctnr = document.createElement('div');
            ctnr.className = "float-end";

            let edit_btn = document.createElement('button');
            edit_btn.classList = "btn btn-add edit-res btn-sm px-3 me-2 rounded-pill list-group-item-secondary";
            edit_btn.id = `${element.id}`;
            edit_btn.innerText = '!';
            edit_btn.setAttribute('data-bs-toggle', 'modal');
            edit_btn.setAttribute('data-bs-target', '#responseModal');

            let delete_btn = document.createElement('button');
            delete_btn.classList = "btn btn-add delete-res btn-sm px-3 rounded-pill list-group-item-danger";
            delete_btn.id = `${element.id}`;
            delete_btn.innerText = 'X';

            let span = document.createElement("span");
            span.innerText = `${element.value} pts`;
            span.classList = "badge list-group-item-success rounded-pill me-2";
            
            ctnr.appendChild(span);
            ctnr.appendChild(edit_btn);
            ctnr.appendChild(delete_btn);

            liResponse.appendChild(ctnr);

            responseContentTag.appendChild(liResponse);
        }
    }

    // *******************************************
    // End functions


    // Main code
    // *******************************************

    setQuestion(questions);
    setResponse(responses);

    // Question deletion
    // --------------------
    let deleteBtns = document.querySelectorAll('.delete');

    for (let index = 0; index < deleteBtns.length; index++) {
        const element = deleteBtns[index];

        element.addEventListener('click', async (e) => {
            deleteConfirm('http://localhost:8000/api/question/', Number(e.target.id));
        });
    }

    // Question editing
    // --------------------
    let editBtns = document.querySelectorAll('.edit');

    for (let index = 0; index < editBtns.length; index++) {
        const element = editBtns[index];

        element.addEventListener('click', async (e) => {
            saveBtn.textContent = 'Modifier';
            saveBtn.value = element.id;
            let question = {};
            await getQuestion(Number(e.target.id)).then(res => {
                question = res;
            });
            questionField.textContent = `${question.question_label}`;
        });
    }


    // Response deletion
    // --------------------
    let delete_resBtn = document.querySelectorAll('.delete-res');

    for (let index = 0; index < delete_resBtn.length; index++) {
        const element = delete_resBtn[index];

        element.addEventListener('click', async (e) => {
            deleteConfirm('http://localhost:8000/api/response/', Number(e.target.id));
        });
    }

    // Question editing
    // --------------------
    let edit_resBtn = document.querySelectorAll('.edit-res');

    for (let index = 0; index < edit_resBtn.length; index++) {
        const element = edit_resBtn[index];

        element.addEventListener('click', async (e) => {
            save_resBtn.textContent = 'Modifier';
            save_resBtn.value = element.id;
            let response = {};
            await getResponse(Number(e.target.id)).then(res => {
                response = res;
            });
            responseField.textContent = `${response.label}`;
            valueField.value = `${response.value}`;
        });
    }

    // *******************************************
    // End main code


    // All event listers
    // *******************************************

    document.querySelector('.add-question').addEventListener('click', (e) => {
        questionField.value = '';
    });

    document.querySelector('.add-response').addEventListener('click', (e) => {
        responseField.value = '';
        valueField.value = '';
    });

    document.querySelector('#addquestionForm').addEventListener('submit', async (e) => {
        // e.preventDefault();
        const question = {};
        const questionAbout = document.querySelectorAll("textarea")[0];

        question[questionAbout.name] = questionAbout.value;

        if (saveBtn.textContent == 'Modifier') {
            let id = Number(saveBtn.value);
            await postDataThroughApi('http://localhost:8000/api/question/'+id+'/', question, 'PUT');
        }else {
            await postDataThroughApi('http://localhost:8000/api/question/', question);
        }
    });

    document.querySelector('#addResponseForm').addEventListener('submit', async  (e) => {
        const response = {};
        const label = document.querySelectorAll("textarea")[1];
        const val= document.querySelector("#id_value");

        response[label.name] = label.value;
        response[val.name] = val.value;

        if (save_resBtn.textContent == 'Modifier') {
            let id = Number(save_resBtn.value);
            await postDataThroughApi('http://localhost:8000/api/response/'+id+'/', response, 'PUT');
        }else {
            await postDataThroughApi('http://localhost:8000/api/response/', response);
        }

    });

    // *******************************************
    // End event listener

}

window.addEventListener('DOMContentLoaded', () => fetchData());