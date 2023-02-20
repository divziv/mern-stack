//const { createTodo } = require("../backend/lib/todolib");

document.getElementById("loader").style.display="block";

const inputBox = documentType.getElementById("inputBox");
inputBox.addEventListener("keydown",function(event){
    if(event.keyCode==13)
    {
        createTodo(inputBox.value);
    }
});

async function createTodo(text)
{
    await fetch("/api/todos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:text})});
}


async function getAllTodo()
{
    const todores=await fetch("/api/todos");
    const todos=await todores.json();
    //alert(JSON.stringify(todoList));
    const todoList = document.getElementById("todoList");

        todoList.innerHTML = null
        console.log(todos);
        todoCount = todos.data.length;
        document.getElementById("todoCount").innerHTML = todoCount
        
        todos.data.forEach((el, index) => {
       
            let listItem = document.createElement("li");
            let labelItem = document.createElement("label");
            let inputItem = document.createElement("input");
            let buttonItem = document.createElement("button");

            // * CREATING THE DELETE BUTTON
            buttonItem.classList.add("btn");
            buttonItem.classList.add("btn-outline-danger");
            buttonItem.innerHTML = `<i class="fas fa-close fa-lg fa-fw"></i>`
            buttonItem.setAttribute("onclick", `deleteTodo("${el._id}")`)

            // * CREATING THE CHECKBOX
            inputItem.classList.add("form-check-input")
            inputItem.classList.add("me-1")
            inputItem.type = "checkbox";
            inputItem.value = "";
            inputItem.setAttribute("onclick", `setChecked("${el._id}")`)
            inputItem.id =`Checkbox${index}`
        
            
            // * CREATING THE TEXT LABEL
            let textNode = document.createTextNode(el.text);
            labelItem.classList.add("form-check-label");
            labelItem.setAttribute("for",`Checkbox${index}`)
            labelItem.appendChild(textNode);
            labelItem.setAttribute("data-name", `${el._id}`);

            if (el.isCompleted) {
                labelItem.classList.add("crossed")
                inputItem.setAttribute("checked", "true")
            }
            
            // * ADDING BOOTSTRAP CLASSES TO THE LIST ITEM <LI> TAG
            listItem.classList.add("list-group-item")
            listItem.classList.add("my-list-item")

            listItem.appendChild(inputItem);
            listItem.appendChild(labelItem);
            listItem.appendChild(buttonItem);

            todoList.appendChild(listItem);
        })
}

getAllTodo();


fetch("/api/todos")
.then(function(res){

    return res.json();
})
.then(function(data){
    console.log(data);
    document.getElementById("loader").style.display="none";
});


var light=true;
function setTheme(){
    if(light)
    {
        document.documentElement.setAttribute("data-bs-theme","dark");
        document.getElementById("themeButton").innerHTML='<i class="fas fa-sun fa-lg fa-fw"></i>';
    }
    else
    {
        document.getElementById("themeButton").innerHTML='<i class="fas fa-moon fa-lg fa-fw"></i>';
        document.documentElement.setAttribute("data-bs-theme","light");
    }
    light=!light;
}
