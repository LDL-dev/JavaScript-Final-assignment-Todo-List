const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.querySelector('.list');
let tasks;

const createNewSpan = () => {
  const newSpan = document.createElement('span');
  newSpan.className = 'list-item-text';
  return newSpan;
}

const createNewCheckbox= () => {
  const newCheckbox = document.createElement('input');
  newCheckbox.type = 'checkbox';
  return newCheckbox;
}

const createNewLi = (task) => {
  const newSpan = createNewSpan();
  newSpan.innerHTML = task.description;
  const newCheckbox = createNewCheckbox();
  newCheckbox.checked = task.done;
  if (!newCheckbox.checked) newSpan.style.textDecoration = 'none'
  else if (newCheckbox.checked) newSpan.style.textDecoration = 'line-through';
  newCheckbox.addEventListener('change', async () => {
    task.done = newCheckbox.checked;
    if (!newCheckbox.checked) newSpan.style.textDecoration = 'none'
    else if (newCheckbox.checked) newSpan.style.textDecoration = 'line-through';
    await putTask(task._id, task);
  });
  const newLi = document.createElement('li');
  newLi.className = 'list-item';
  newLi.appendChild(newCheckbox);
  newLi.appendChild(newSpan);
  return newLi;
}

const createTrashCan = () => {
  const trashCan = document.createElement('img');
  trashCan.src = 'trash-can.png';
  trashCan.className = 'trash-can';
  return trashCan;
}

const createListItems = () => {
  tasks.forEach(task => {
    const newLi = createNewLi(task);
    const trashCan = createTrashCan();
    trashCan.addEventListener('click', async () => {
      await deleteTask(task._id);
      taskList.removeChild(newLi);
    });
    newLi.appendChild(trashCan);
    taskList.appendChild(newLi);
  });
}

const addTaskListToDOM = async () => {
  tasks = await getTasks();
  taskList.innerHTML = '';
  createListItems();
};

const handleAddTask = async () => {
  if (newTaskInput.value != '') {
    await postTask({description: `${newTaskInput.value}`, done: false});
    newTaskInput.value = '';
    addTaskListToDOM();    
  }
  else {
    console.log('Can\'t add an empty task!');
  }
};

addTaskBtn.addEventListener('click', handleAddTask);
newTaskInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") handleAddTask();  
});

addTaskListToDOM();