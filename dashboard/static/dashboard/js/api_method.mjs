// All variables
const csrftoken = document.querySelector('input[name="csrfmiddlewaretoken"]').value

// import Swal from "../../../../node_modules/sweetalert2/dist/sweetalert2.min.js";

// ALl methods
export const postDataThroughApi = async (url, data, meth ='POST') => {

    const rawResponse = await fetch(url,{
        method: meth,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify(data)
    });

    return rawResponse.json();

}


export const deleteDataThrouthApi = async (url, id) => {
    
    await fetch(url+ id +'/',{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken
        }
    });
}

export const deleteConfirm = async (url, id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet iteme !')) {
        deleteDataThrouthApi(url, id);
        location.reload();
   }
    // Swal.fire("test");
}


export const getEvaluation = async () => {

    const url = 'http://localhost:8000/api/evaluation/';

    let res = await fetch(url);
    const evaluations = await res.json();

    return evaluations;
}


export const getComment = async () => {

    const url = 'http://localhost:8000/api/comments/';

    let res = await fetch(url);
    const comments = await res.json();

    return comments;
}


export const getCourse = async (id=null) => {
    let url = 'http://localhost:8000/api/course/';

    if (id) {
        url = 'http://localhost:8000/api/course/'+id+'/';
    }
    
    let res = await fetch(url);
    const courses = await res.json();

    return courses;
}

export const getTeacher = async (id=null) => {
    let url = 'http://localhost:8000/api/teacher/';

    if (id) {
        url = 'http://localhost:8000/api/teacher/'+id+'/';
    }
    
    let res = await fetch(url);
    const teachers = await res.json();

    return teachers;
}

export const getQuestion = async (id=null) => {
    
    let url = 'http://localhost:8000/api/question/';

    if (id) {
        url = 'http://localhost:8000/api/question/'+id+'/';
    }
    
    let res = await fetch(url);
    const questions = await res.json();

    return questions;
}

export const getResponse = async (id=null) => {
    
    let url = 'http://localhost:8000/api/response/';

    if (id) {
        url = 'http://localhost:8000/api/response/'+id+'/';
    }
    
    let res = await fetch(url);
    const responses = await res.json();

    return responses;
}


export const getStudent = async (id=null) => {
    
    let url = 'http://localhost:8000/api/student/';
    if (id) {
        url = 'http://localhost:8000/api/student/'+id+'/';
    }
    let res = await fetch(url);
    const students = await res.json();

    return students;
}

export const getFaculty = async (id=null) => {
    let url = 'http://localhost:8000/api/faculty/';
    if (id) {
        url = 'http://localhost:8000/api/faculty/' + id + '/';
    }
    let res = await fetch(url);
    const faculties = await res.json();

    return faculties;
}

export const getPromotion = async (id=null) => {
    let url = 'http://localhost:8000/api/promotion/';
    if (id) {
        url = 'http://localhost:8000/api/promotion/'+id+'/';
    }
    let res = await fetch(url);
    const promotions = await res.json();

    return promotions;
}