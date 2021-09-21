import { getTeacher, getCourse, getComment  } from "./api_method.mjs";


const courseContentTag = document.querySelector('#course-content');
const commentContnetTag = document.querySelector('#comments-content');


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

    // Get courses through the api
    let comments = [];
    await getComment().then(res => {
        comments = res;
    });


    // All functions
    // *******************************************


    const getTotalCommentPerCourse = course_id => {

        let count = 0;

        for (let index = 0; index < comments.length; index++) {
            const element = comments[index];

            if (course_id === element.course) {
                count += 1;
            }

        }
        return count;
    }

    const setCourse = courses => {

        for (let index = 0; index < courses.length; index++) {
            const course = courses[index];

            let liCourse = document.createElement("li");
            liCourse.classList = "course list-group-item d-flex hover justify-content-between align-items-start";
            liCourse.id = course.id;
            liCourse.textContent = course.label;

            let span = document.createElement("span");
            span.innerText = `${getTotalCommentPerCourse(course.id)}dsds`;
            span.classList = "badge list-group-item-info rounded-pill me-2 float-end";


            liCourse.appendChild(span);

            courseContentTag.appendChild(liCourse);
            
        }
        
    }


    // *******************************************
    // End functions


    // Main code
    // *******************************************


    setCourse(courses);


    // *******************************************
    // End main code


    // All event listers
    // *******************************************

    let courseList = document.querySelectorAll(".course");


    for (let index = 0; index < courseList.length; index++) {
        const course = courseList[index];


        course.addEventListener("click", (e) => {
            e.preventDefault();

            let count = 0;

            commentContnetTag.innerHTML = '';

            for (let index = 0; index < comments.length; index++) {
                const comment = comments[index];
                
                if (comment.course === Number(course.id)) {

                    count += 1;

                    let commentNumber = document.createElement('p');
                    commentNumber.classList = "pb-0 pt-2";
                    commentNumber.innerText = `Commentaire : ${count}`;

                    commentContnetTag.appendChild(commentNumber);

                    let commentArea = document.createElement("textarea");
                    commentArea.classList = "form-control";
                    commentArea.setAttribute('disabled', 'true');
                    commentArea.style.height = '80px';
                    commentArea.id = comment.id;
                    commentArea.value = comment.comment;

                    commentContnetTag.appendChild(commentArea);

                }
            }


        });
    }

    // *******************************************
    // End event listener

}

window.addEventListener('DOMContentLoaded', () => fetchData());