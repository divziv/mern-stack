// //const { createTodo } = require("../backend/lib/todolib");

// document.getElementById("loader").style.display="block";

// const inputBox = documentType.getElementById("inputBox");
// inputBox.addEventListener("keydown",function(event){
//     if(event.keyCode==13)
//     {
//         createTodo(inputBox.value);
//     }
// });
// async function createTodo(text)
// {
//     await fetch("/api/todos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:text})});
// }

// /*
// function createTodo() {
//     const todoList = document.getElementById("todoList");
//     const inputBox = document.getElementById("inputBox");
  
//     if (inputBox.value !== "") {
//       const newTodo = document.createElement("li");
//       newTodo.innerText = inputBox.value;
//       todoList.appendChild(newTodo);
//       inputBox.value = "";
//     }
//   }
// */

// async function getAllTodo()
// {
//     const todores=await fetch("/api/todos");
//     const todos=await todores.json();
//     //alert(JSON.stringify(todoList));
//     const todoList = document.getElementById("todoList");

//         todoList.innerHTML = null
//         console.log(todos);
//         todoCount = todos.data.length;
//         document.getElementById("todoCount").innerHTML = todoCount
        
//         todos.data.forEach((el, index) => {
       
//             let listItem = document.createElement("li");
//             let labelItem = document.createElement("label");
//             let inputItem = document.createElement("input");
//             let buttonItem = document.createElement("button");

//             // * CREATING THE DELETE BUTTON
//             buttonItem.classList.add("btn");
//             buttonItem.classList.add("btn-outline-danger");
//             buttonItem.innerHTML = `<i class="fas fa-close fa-lg fa-fw"></i>`
//             buttonItem.setAttribute("onclick", `deleteTodo("${el._id}")`)

//             // * CREATING THE CHECKBOX
//             inputItem.classList.add("form-check-input")
//             inputItem.classList.add("me-1")
//             inputItem.type = "checkbox";
//             inputItem.value = "";
//             inputItem.setAttribute("onclick", `setChecked("${el._id}")`)
//             inputItem.id =`Checkbox${index}`
        
            
//             // * CREATING THE TEXT LABEL
//             let textNode = document.createTextNode(el.text);
//             labelItem.classList.add("form-check-label");
//             labelItem.setAttribute("for",`Checkbox${index}`)
//             labelItem.appendChild(textNode);
//             labelItem.setAttribute("data-name", `${el._id}`);

//             if (el.isCompleted) {
//                 labelItem.classList.add("crossed")
//                 inputItem.setAttribute("checked", "true")
//             }
            
//             // * ADDING BOOTSTRAP CLASSES TO THE LIST ITEM <LI> TAG
//             listItem.classList.add("list-group-item")
//             listItem.classList.add("my-list-item")

//             listItem.appendChild(inputItem);
//             listItem.appendChild(labelItem);
//             listItem.appendChild(buttonItem);

//             todoList.appendChild(listItem);
//         })
// }

// getAllTodo();


// fetch("/api/todos")
// .then(function(res){

//     return res.json();
// })
// .then(function(data){
//     console.log(data);
//     document.getElementById("loader").style.display="none";
// });

// /*
// var light=true;
// function setTheme(){
//     if(light)
//     {
//         document.documentElement.setAttribute("data-bs-theme","dark");
//         document.getElementById("themeButton").innerHTML='<i class="fas fa-sun fa-lg fa-fw"></i>';
//     }
//     else
//     {
//         document.getElementById("themeButton").innerHTML='<i class="fas fa-moon fa-lg fa-fw"></i>';
//         document.documentElement.setAttribute("data-bs-theme","light");
//     }
//     light=!light;
// }
// */
// /*
// function setTheme() {
//     const htmlTag = document.getElementById('html-tag');
//     htmlTag.classList.toggle('dark-mode');
//     const themeButton = document.getElementById('themeButton');
//     const currentIcon = themeButton.querySelector('i');
  
//     if (htmlTag.classList.contains('dark-mode')) {
//       currentIcon.classList.remove('fa-moon');
//       currentIcon.classList.add('fa-sun');
//       currentIcon.setAttribute('title', 'Switch to light mode');
//     } else {
//       currentIcon.classList.remove('fa-sun');
//       currentIcon.classList.add('fa-moon');
//       currentIcon.setAttribute('title', 'Switch to dark mode');
//     }
//   }
//   */

// function setTheme() {
//     const body = document.body;
//     const themeButton = document.getElementById("themeButton");

//     if (body.classList.contains("dark-theme")) {
//         body.classList.remove("dark-theme");
//         themeButton.innerHTML = '<i class="fas fa-moon fa-lg fa-fw"></i>';
//     } 
//     else {
//         body.classList.add("dark-theme");
//         themeButton.innerHTML = '<i class="fas fa-sun fa-lg fa-fw"></i>';
//     }
// }
console.log("Hello from JS");
document.getElementById("loader").style.display = "block";
const inputBox = document.getElementById("inputBox");
inputBox.addEventListener("keydown",function(event){
    if(event.keyCode == 13){
        createTodo();
    }
});

async function createTodo(){
    let text = inputBox.value;
    console.log(text + 'j');
    await fetch("/api/todos",{method : "POST", headers : {"Content-Type" : "application/json"}, body : JSON.stringify({title : text})});
    await getAllTodos();
    await getAllCompletedTodos();
    await getAllDeletedTodos();
}

async function deleteTodo(id){
    await fetch("/api/todos/" + id, {method : "DELETE" ,headers : {"Content-Type" : "application/json"}});
    await getAllTodos();
    await getAllCompletedTodos();
    await getAllDeletedTodos();
}

async function setChecked(id)
{
    await fetch("/api/todos/" + id,{method : "PUT", headers : {"Content-Type" : "application/json"}, body : JSON.stringify({isCompleted : true})});
    await getAllTodos();
    await getAllCompletedTodos();
    await getAllDeletedTodos();
}

async function getAllDeletedTodos()
{  
    const todoList = document.getElementById("deletedTodosList");
    todoList.innerHTML = null;
    fetch("/api/isdeleted").then(function(res){
        return res.json();
    }).then(function(file){
        let count = 0;
        file.data.forEach((el,index) => {
            
            let text = el.title;
            let listItem = document.createElement("li");
            let labelItem = document.createElement("label");

            let textNode = document.createTextNode(text);
            labelItem.classList.add("form-check-label");
            labelItem.setAttribute("for",`Checkbox${index}`);
            labelItem.appendChild(textNode);
            labelItem.setAttribute("data-name", `${el._id}`);

            listItem.classList.add("list-group-item");
            listItem.classList.add("d-flex");
            listItem.classList.add("justify-content-between");
            listItem.classList.add("align-items-center");

            listItem.appendChild(labelItem);
            todoList.appendChild(listItem);
        });
    }).catch(function(err){
        console.log(err);
    });
}

async function getAllCompletedTodos()
{  
    const todoList = document.getElementById("completedTodosList");
    todoList.innerHTML = null;
    fetch("/api/iscompleted").then(function(res){
        return res.json();
    }).then(function(file){
        let count = 0;
        file.data.forEach((el,index) => {
            
            let text = el.title;
            let listItem = document.createElement("li");
            let labelItem = document.createElement("label");
            let buttonItem = document.createElement("button");

            buttonItem.classList.add("btn");
            buttonItem.classList.add("btn-outline-danger");
            buttonItem.innerHTML = `<i class="fas fa-close fa-lg fa-fw"></i>`;
            buttonItem.setAttribute("onclick", `deleteTodo("${el._id}")`);

            let textNode = document.createTextNode(text);
            labelItem.classList.add("form-check-label");
            labelItem.setAttribute("for",`Checkbox${index}`);
            labelItem.appendChild(textNode);
            labelItem.setAttribute("data-name", `${el._id}`);

            listItem.classList.add("list-group-item");
            listItem.classList.add("d-flex");
            listItem.classList.add("justify-content-between");
            listItem.classList.add("align-items-center");

            listItem.appendChild(labelItem);
            listItem.appendChild(buttonItem);
            todoList.appendChild(listItem);
        });
    }).catch(function(err){
        console.log(err);
    });
}

async function getAllTodos(){
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = null;
    fetch("/api/todos").then(function(res){
        return res.json();
    }).then(function(file){
        let count = 0;
        file.data.forEach((el,index) => {
            
            let text = el.title;
            let listItem = document.createElement("li");
            let checkbox = document.createElement("input");
            let labelItem = document.createElement("label");
            let buttonItem = document.createElement("button");

            buttonItem.classList.add("btn");
            buttonItem.classList.add("btn-outline-danger");
            buttonItem.innerHTML = `<i class="fas fa-close fa-lg fa-fw"></i>`;
            buttonItem.setAttribute("onclick", `deleteTodo("${el._id}")`);

            checkbox.classList.add("form-check-input");
            checkbox.classList.add("me-2");
            checkbox.type = "checkbox";
            checkbox.value = "";
            checkbox.setAttribute("onclick", `setChecked("${el._id}")`);
            checkbox.id =`Checkbox${index}`;

            let textNode = document.createTextNode(text);
            labelItem.classList.add("form-check-label");
            labelItem.setAttribute("for",`Checkbox${index}`);
            labelItem.appendChild(textNode);
            labelItem.setAttribute("data-name", `${el._id}`);

            listItem.classList.add("list-group-item");
            listItem.classList.add("d-flex");
            listItem.classList.add("justify-content-between");
            listItem.classList.add("align-items-center");

            listItem.appendChild(checkbox);
            listItem.appendChild(labelItem);
            listItem.appendChild(buttonItem);
    
            todoList.appendChild(listItem);
        });
    }).catch(function(err){
        console.log(err);
    });
}

fetch("/api/todos").then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
    document.getElementById("loader").style.display = "none";
})

var light = true;
function setTheme(){
    if(light){
        document.documentElement.setAttribute("data-bs-theme","dark");
        document.getElementById("themeButton").innerHTML = '<i class="fas fa-sun fa-lg fa-fw"></i>';
        light = false;
    }
    else{
        document.documentElement.setAttribute("data-bs-theme","light");
        document.getElementById("themeButton").innerHTML = '<i class="fas fa-moon fa-lg fa-fw"></i>';
        light = true;
    }
}
