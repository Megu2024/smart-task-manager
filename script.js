let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let filter="all";

document.getElementById("taskInput")
.addEventListener("keypress",function(e){
if(e.key==="Enter") addTask();
});

function addTask(){

let text=document.getElementById("taskInput").value;
let deadline=document.getElementById("deadline").value;
let priority=document.getElementById("priority").value;

if(text.trim()==="") return;

tasks.push({
text,
deadline,
priority,
completed:false
});

document.getElementById("taskInput").value="";

save();

}

function toggleTask(index){

tasks[index].completed=!tasks[index].completed;

save();

}

function deleteTask(index){

tasks.splice(index,1);

save();

}

function setFilter(type){

filter=type;

render();

}

function clearTasks(){

tasks=[];

save();

}

function render(){

let list=document.getElementById("taskList");

list.innerHTML="";

let filtered=tasks.filter(task=>{

if(filter==="completed") return task.completed;

if(filter==="pending") return !task.completed;

return true;

});

filtered.forEach((task,i)=>{

let li=document.createElement("li");

li.classList.add("priority-"+task.priority);

let left=document.createElement("div");
left.style.display="flex";
left.style.alignItems="center";
left.style.gap="10px";

let checkbox=document.createElement("input");
checkbox.type="checkbox";
checkbox.checked=task.completed;

checkbox.onchange=()=>toggleTask(i);

let info=document.createElement("div");
info.className="task-info";

let title=document.createElement("span");
title.innerText=task.text;

if(task.completed) title.classList.add("completed");

let date=document.createElement("small");
date.innerText=task.deadline;

info.appendChild(title);

if(task.deadline) info.appendChild(date);

left.appendChild(checkbox);
left.appendChild(info);

let del=document.createElement("i");
del.className="fa-solid fa-trash delete";

del.onclick=()=>deleteTask(i);

li.appendChild(left);
li.appendChild(del);

list.appendChild(li);

});

updateStats();

}

function updateStats(){

let total=tasks.length;

let done=tasks.filter(t=>t.completed).length;

document.getElementById("stats").innerText=
done+" / "+total+" tasks completed";

let percent= total ? (done/total)*100 : 0;

document.getElementById("progress").style.width=percent+"%";

}

function toggleDarkMode(){

document.body.classList.toggle("dark");

}

function save(){

localStorage.setItem("tasks",JSON.stringify(tasks));

render();

}

render();