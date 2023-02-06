var courseName = document.getElementById('courseName');
var courseCategory= document.getElementById('courseCategory');
var coursePrice = document.getElementById('coursePrice');
var courseDescription = document.getElementById('courseDescription');
var tableBody = document.getElementById('tableBody');
var deleteBtn = document.getElementById('deleteBtn');
var search = document.getElementById("search");
var courses;

if(JSON.parse(localStorage.getItem('courses')) == null){
    courses =[];
}else{
    courses = JSON.parse(localStorage.getItem('courses'));
}
var currIndex=0;
var addBtn = document.getElementById('addBtn');
var ad= document.getElementById('addBtn1');
display();
 
// ad.addEventListener("click" ,function(e){
//     e.preventDefault(coursePrice.value);
//     console.log(Flag1+'flag1');
//     console.log(Flag2+'flag2');
//     console.log(Flag3+'flag3');
//     console.log(Flag4+'flag4');
// });




 //add course
addBtn.addEventListener("click" ,function(e){
    e.preventDefault(coursePrice.value);
   
    if((courseName.value =='') || (courseCategory.value == '') || (coursePrice.value == '') || (courseDescription.value == '') ){
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill all text',
        })}else if(!Flag1 || !Flag2 || !Flag3 || !Flag4){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please add valid value',
            })
        }else{
            
            if(addBtn.value=="Add Course"){
                addCourseP();
            }else{
                updateCourse();
            }
        }

        display();
        clearInputs();
        courseName.classList.remove('is-valid');
        courseCategory.classList.remove('is-valid');
        coursePrice .classList.remove('is-valid');
        courseDescription.classList.remove('is-valid');
});

function addCourseP(){
    
    var course = {
        Name: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description: courseDescription.value
    }
     
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
   
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course Added',
        showConfirmButton: false,
        timer: 1500
      })
}

//clear inputs
function clearInputs(){
    courseName.value = '';
    courseCategory.value = '';
    coursePrice.value = '';
    courseDescription.value = ''; 

}


// display courses
function display(){

    var data='';
    for(var i=0; i<courses.length ; i++){
        data +=`<tr>
                    <td>${i+1}</td>
                    <td>${courses[i].Name}</td>
                    <td>${courses[i].category}</td>
                    <td>${courses[i].price}</td>
                    <td>${courses[i].description}</td>
                    <td>
                        <button class="btn add-btn fs-4 mt-3">
                            <span class="add-btn-text fs-6" onclick="getCourse(${i})">Edit</span>
                            <span class="add-btn-icon fs-6"><i class="fa-solid fa-pen-to-square"></i></span>
                        </button>
                    </td>
                    <td>
                        <button class="btn delete-btn mt-3">
                            <span class="delete-btn-text fs-6" onclick="deleteCourse(${i})" >Delete</span>
                            <span class="delete-btn-icon fs-6"><i class="fa-solid fa-trash-can"></i></span>    
                        </button>
                    </td>
                </tr>`
    }
    tableBody.innerHTML = data;
}


//delete course 
 function deleteCourse(index){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1);
            localStorage.setItem('courses', JSON.stringify(courses));
            display();
            swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    
 }



 //delete all
deleteBtn.onclick = function(){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            localStorage.setItem('courses', JSON.stringify(courses));
           tableBody.innerHTML = "";
           swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    

 }



 //search
 function serachCourses(){
    console.log(search.value);

    var searchKey = search.value;
    var data='';
    for(var i=0; i<courses.length ; i++){


        if( courses[i].Name.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || courses[i].category.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())      ){
        data +=`<tr>
                    <td>${i+1}</td>
                    <td>${courses[i].Name}</td>
                    <td>${courses[i].category}</td>
                    <td>${courses[i].price}</td>
                    <td>${courses[i].description}</td>
                    <td>
                        <button class="btn add-btn fs-4 mt-3">
                            <span class="add-btn-text fs-6" onclick="getCourse(${i})">Edit</span>
                            <span class="add-btn-icon fs-6"><i class="fa-solid fa-pen-to-square"></i></span>
                        </button>
                    </td>
                    <td>
                        <button class="btn delete-btn mt-3">
                            <span class="delete-btn-text fs-6" onclick="deleteCourse(${i})" >Delete</span>
                            <span class="delete-btn-icon fs-6"><i class="fa-solid fa-trash-can"></i></span>    
                        </button>
                    </td>
                </tr>`
    }

    tableBody.innerHTML = data;
    }
}


//update course 
function getCourse(index){
    var course = courses[index];
    courseName.value = course.Name;
    courseCategory.value = course.category;
    coursePrice.value =course.price;
    courseDescription.value = course.description; 
    addBtn.value="Update Course";
    currIndex = index; 

}


function updateCourse(){
    var course = {
        Name: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description: courseDescription.value
    }
    var preCo = courses[currIndex].Name;
    courses[currIndex].Name = course.Name;
    courses[currIndex].category = course.category;
    courses[currIndex].price = course.price;
    courses[currIndex].description = course.description;

    localStorage.setItem('courses', JSON.stringify(courses));
    addBtn.value="Add Course";

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Course ${preCo} Updated Successfully`,
        showConfirmButton: false,
        timer: 1500
      })

}




//validation
// regex



/*
*first lette capital 
*name 3-10
*no number
*regex /^[A-Z][a-z]{2,10}$/
*/
var Flag1,Flag2,Flag3,Flag4;
courseName.onkeyup = function(){

    var pattern1 = /^[A-Z][A-Za-z]{2,10}$/;
    
    if(pattern1.test(courseName.value)){
       Flag1=pattern1.test(courseName.value);
        if(courseName.classList.contains('is-invalid')){
            courseName.classList.replace('is-invalid','is-valid');
        }else{
            courseName.classList.add('is-valid');
        }
        if(Flag1 && Flag2 && Flag3 && Flag4){
            addBtn.removeAttribute('disabled');
        }
        document.getElementById('nameAlert').classList.add('d-none');
        
       
    }else{
        Flag1=pattern1.test(courseName.value);
        addBtn.setAttribute('disabled','disabled');
        if(courseName.classList.contains('is-valid')){
            courseName.classList.replace('is-valid','is-invalid');
        }else{
            courseName.classList.add('is-invalid');
        }
        document.getElementById('nameAlert').classList.remove('d-none');
        
    }
}




courseCategory.onkeyup = function(){
 var pattern2 = /^[A-Z][A-Za-z]{2,7}$/;
    if(pattern2.test(courseCategory.value)){
        Flag2=pattern2.test(courseCategory.value);
        if(courseCategory.classList.contains('is-invalid')){
            courseCategory.classList.replace('is-invalid','is-valid');
        }else{
            courseCategory.classList.add('is-valid');
        }
        if(Flag1 && Flag2 && Flag3 && Flag4){
            addBtn.removeAttribute('disabled');
        }
        document.getElementById('catAlert').classList.add('d-none');
        
       
    }else{
        Flag2=pattern2.test(courseCategory.value);
        addBtn.setAttribute('disabled','disabled');
        if(courseCategory.classList.contains('is-valid')){
            courseCategory.classList.replace('is-valid','is-invalid');
        }else{
            courseCategory.classList.add('is-invalid');
        }
        document.getElementById('catAlert').classList.remove('d-none');
        
    }
}



coursePrice.onkeyup = function(){
    var pattern3 = /^[2-9][0-9]{1,3}$/;
    var pattern4 = /^[0-1]{1}[0-9]{1}$/;
    var pattern5 =/^[1-9][0-9]{2,3}$/;
  
    if(pattern3.test(coursePrice.value) && !pattern4.test(coursePrice.value) || pattern5.test(coursePrice.value)){
        Flag3=(pattern3.test(coursePrice.value) && !pattern4.test(coursePrice.value) || pattern5.test(coursePrice.value));
        if(coursePrice.classList.contains('is-invalid')){
            coursePrice.classList.replace('is-invalid','is-valid');
        }else{
            coursePrice.classList.add('is-valid');
        }
         
        document.getElementById('priceAlert').classList.add('d-none');
        if(Flag1 && Flag2 && Flag3 && Flag4){
            addBtn.removeAttribute('disabled');
        }
       
    }else{
        Flag3=(pattern3.test(coursePrice.value) && !pattern4.test(coursePrice.value) || pattern5.test(coursePrice.value));
        addBtn.setAttribute('disabled','disabled');
        if(coursePrice.classList.contains('is-valid')){
            coursePrice.classList.replace('is-valid','is-invalid');
        }else{
            coursePrice.classList.add('is-invalid');
        }
        document.getElementById('priceAlert').classList.remove('d-none');
        
    }
}

var pattern6=//;

courseDescription.onkeyup = function(){
    var pattern6 = /^[A-Za-z0-9\s]{1,150}$/;

  
    if(pattern6.test(courseDescription.value) ){
        Flag4 = pattern6.test(courseDescription.value);
        if(courseDescription.classList.contains('is-invalid')){
            courseDescription.classList.replace('is-invalid','is-valid');
        }else{
            courseDescription.classList.add('is-valid');
        }
        
        if(Flag1 && Flag2 && Flag3 && Flag4){
            addBtn.removeAttribute('disabled');
        }
        document.getElementById('descriptionAlert').classList.add('d-none');
        
       
    }else{
        Flag4 = pattern6.test(courseDescription.value);
        addBtn.setAttribute('disabled','disabled');
        if(courseDescription.classList.contains('is-valid')){
            courseDescription.classList.replace('is-valid','is-invalid');
        }else{
            courseDescription.classList.add('is-invalid');
        }
        document.getElementById('descriptionAlert').classList.remove('d-none');
        
    }
}










    



// if((pattern1.test(courseName.value)) && (pattern2.test(courseCategory.value)) && (pattern3.test(coursePrice.value) && !pattern4.test(coursePrice.value) || pattern5.test(coursePrice.value)) && (pattern6.test(courseDescription.value)) ){

//     console.log('OLA');
//     addBtn.removeAttribute( 'disabled');
// }

 
