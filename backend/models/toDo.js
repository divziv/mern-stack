//const mongoose=require("mongoose");

document.getElementById("loader").style.display="block";

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



// const userSchema=new mongoose.Schema({
//     title:{type:String,required:true,unique:true},
//     createdAt:{type:Date,default:Date.now},
//     isCompleted:{type:Boolean,default:false},
//     isDeleted:{type:Boolean,default:false}
// });

// const toDo = mongoose.model("user",userSchema);

// module.exports=toDo;
