import { getFaculty, getPromotion, postDataThroughApi, deleteConfirm } from "./api_method.mjs"

const fac_name_field = document.querySelector('#id_fac_label');
fac_name_field.classList += " form-control mx-auto area_fixed";
fac_name_field.setAttribute('placeholder', 'Veillez taper le nom de faculté ici !');
const prom_name_field = document.querySelector('#id_label');
prom_name_field.classList += " form-control mx-auto area_fixed";
prom_name_field.setAttribute('placeholder', 'Veillez taper le nom de la promotion ici !');


const facultyContentTag = document.querySelector("#faculty-content");
const promotionContentTag = document.querySelector("#promotion-content");


const fetchData = async () => {

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

    // All functions
    // *******************************************

    const setFaculty = array => {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            let liFac = document.createElement("li");
            liFac.classList = "list-group-item d-flex justify-content-between align-items-start";
            liFac.textContent = element.fac_label;

            let ctnr = document.createElement('div');
            ctnr.className = "float-end";

            let edit_btn = document.createElement('button');
            edit_btn.classList = "btn btn-add edit-fac btn-sm px-3 me-2 rounded-pill list-group-item-secondary";
            edit_btn.id = `${element.id}`;
            edit_btn.innerText = '!';
            edit_btn.setAttribute('data-bs-toggle', 'modal');
            edit_btn.setAttribute('data-bs-target', '#facultyModal');

            let delete_btn = document.createElement('button');
            delete_btn.classList = "btn btn-add delete-fac btn-sm px-3 rounded-pill list-group-item-danger";
            delete_btn.id = `${element.id}`;
            delete_btn.innerText = 'X';

            ctnr.appendChild(edit_btn);
            ctnr.appendChild(delete_btn);

            liFac.appendChild(ctnr);

            facultyContentTag.appendChild(liFac);
        }
    }

    const setPromotion = array => {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            let liPromotion = document.createElement("li");
            liPromotion.classList = "list-group-item d-flex justify-content-between align-items-start";
            liPromotion.textContent = element.label;

            let ctnr = document.createElement('div');
            ctnr.className = "float-end";

            let edit_btn = document.createElement('button');
            edit_btn.classList = "btn btn-add edit-prom btn-sm px-3 me-2 rounded-pill list-group-item-secondary";
            edit_btn.id = `${element.id}`;
            edit_btn.innerText = '!';
            edit_btn.setAttribute('data-bs-toggle', 'modal');
            edit_btn.setAttribute('data-bs-target', '#promotionModal');

            let delete_btn = document.createElement('button');
            delete_btn.classList = "btn btn-add delete-prom btn-sm px-3 rounded-pill list-group-item-danger";
            delete_btn.id = `${element.id}`;
            delete_btn.innerText = 'X';

            ctnr.appendChild(edit_btn);
            ctnr.appendChild(delete_btn);

            liPromotion.appendChild(ctnr);

            promotionContentTag.appendChild(liPromotion);
        }
    }

    // *******************************************
    // End functions


    // Main code
    // *******************************************

    setFaculty(faculties);
    setPromotion(promotions);

    // Faculty editing
    // --------------------
    let editBtns = document.querySelectorAll('.edit-fac');
    const save_facBtn = document.querySelector('#save-facBtn');

    for (let index = 0; index < editBtns.length; index++) {
        const element = editBtns[index];

        element.addEventListener('click', async (e) => {
            save_facBtn.textContent = 'Modifier';
            save_facBtn.value = element.id;
            let faculty = {};
            await getFaculty(Number(e.target.id)).then(res => {
                faculty = res;
            });
            fac_name_field.textContent = `${faculty.fac_label}`;
        });
    }

    // Faculty deletion
    // --------------------
    let delete_facBtns = document.querySelectorAll('.delete-fac');

    for (let index = 0; index < delete_facBtns.length; index++) {
        const element = delete_facBtns[index];

        element.addEventListener('click', async (e) => {
            deleteConfirm('http://localhost:8000/api/faculty/', Number(e.target.id));
        });
    }


    // Promotion editing
    // --------------------
    let edit_promBtns = document.querySelectorAll('.edit-prom');
    const save_promBtn = document.querySelector('#save-facBtn');

    for (let index = 0; index < edit_promBtns.length; index++) {
        const element = edit_promBtns[index];

        element.addEventListener('click', async (e) => {
            save_promBtn.textContent = 'Modifier';
            save_promBtn.value = element.id;
            let promotion = {};
            await getPromotion(Number(e.target.id)).then(res => {
                promotion = res;
            });
            prom_name_field.textContent = `${promotion.label}`;
        });
    }


    // Promotion deletion
    // --------------------
    let delete_promBtns = document.querySelectorAll('.delete-prom');

    for (let index = 0; index < delete_promBtns.length; index++) {
        const element = delete_promBtns[index];

        element.addEventListener('click', async (e) => {
            deleteConfirm('http://localhost:8000/api/promotion/', Number(e.target.id));
        });
    }

    // *******************************************
    // End main code


    // All event listers
    // *******************************************

    document.querySelector('.add-faculty').addEventListener('click', (e) => {
        fac_name_field.value = '';
    });

    document.querySelector('.add-promotion').addEventListener('click', (e) => {
        prom_name_field.value = '';
    });


    document.querySelector('#addFacultyForm').addEventListener('submit', async  (e) => {
        
        const faculty = {};

        faculty[fac_name_field.name] = fac_name_field.value;

        if (save_facBtn.textContent == 'Modifier') {
            let id = Number(save_facBtn.value);
            await postDataThroughApi('http://localhost:8000/api/faculty/'+id+'/', faculty, 'PUT');
        }else {
            await postDataThroughApi('http://localhost:8000/api/faculty/', faculty);
        }

    });


    document.querySelector('#addPromotionForm').addEventListener('submit', async  (e) => {
        
        const promotion = {};

        promotion[prom_name_field.name] = prom_name_field.value;

        if (save_promBtn.textContent == 'Modifier') {
            let id = Number(save_promBtn.value);
            await postDataThroughApi('http://localhost:8000/api/promotion/'+id+'/', promotion, 'PUT');
        }else {
            await postDataThroughApi('http://localhost:8000/api/promotion/', promotion);
        }

    });

    // *******************************************
    // End event listener

}


window.addEventListener('DOMContentLoaded', () => fetchData());