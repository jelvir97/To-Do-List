const taskList = document.querySelector('.taskList');
const textInput = document.querySelector('#textInput');
const submitBtn = document.querySelector('#btn');
const body = document.querySelector('body');


const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
for(let i = 0; i<savedTasks.length; i++){
    const newTask = document.createElement('li');
    newTask.innerText = savedTasks[i].task;
    newTask.isComplete = savedTasks[i].isComplete;
    const delBtn = document.createElement('button');
    delBtn.classList.add('btn');

    if(newTask.isComplete){
        newTask.classList.add('done')
    }
    newTask.append(delBtn);
    taskList.append(newTask);
}

submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    li.innerText = textInput.value;
    delBtn.classList.add('btn');
    // delBtn.innerHTML = 'X';
    li.append(delBtn);
    taskList.append(li);

    savedTasks.push({task : li.innerText, isComplete: false})
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    textInput.value ='';

})

taskList.addEventListener('click', function(e){
    console.log(e.target.parentElement.innerText);

    if(e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove();
        console.log(e.target.innerText);
        for(let i = 0; i< savedTasks.length;i++){
            if(savedTasks[i].task === e.target.parentElement.innerText){
                savedTasks.splice(i,1);
            }
        }
    }
    else if(e.target.tagName=== 'LI'){
        if(!e.target.isComplete){
            e.target.classList.toggle('done');
            e.target.isComplete = !e.target.isComplete;
            //taskList.append(e.target);
        }else{
            e.target.classList.toggle('done');
            e.target.isComplete = !e.target.isComplete;
            //taskList.prepend(e.target);
        }

    }

    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    for(let i = 0; i< savedTasks.length;i++){
        if(savedTasks[i].task === e.target.innerText){
            savedTasks[i].isComplete = e.target.isComplete;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    
})