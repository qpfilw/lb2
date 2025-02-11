let tasks = [];
let currentFilter = 'all';

const addTask = (taskList, text) => {
  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };
  return [...taskList, newTask];
};

const removeTask = (taskList, id) => {
  return taskList.filter(task => task.id !== id);
};

const toggleTask = (taskList, id) => {
  return taskList.map(task => {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed
      };
    }
    return task;
  });
};

const filterTasks = (taskList, filter) => {
  switch (filter) {
    case 'active':
      return taskList.filter(task => !task.completed);
    case 'completed':
      return taskList.filter(task => task.completed);
    default:
      return taskList;
  }
};

const renderTasks = () => {
  const taskListElement = document.getElementById('task-list');
  taskListElement.innerHTML = '';

  const filteredTasks = filterTasks(tasks, currentFilter);

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    const toggleButton = document.createElement('button');
    toggleButton.textContent = task.completed ? 'Отменить' : 'Выполнить';
    toggleButton.className = 'complete';
    toggleButton.onclick = () => {
      tasks = toggleTask(tasks, task.id);
      renderTasks();
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'delete';
    deleteButton.onclick = () => {
      tasks = removeTask(tasks, task.id);
      renderTasks();
    };
    actionsDiv.appendChild(toggleButton);
    actionsDiv.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(actionsDiv);
    taskListElement.appendChild(li);
  });
};

document.getElementById('add-task-btn').addEventListener('click', () => {
  const input = document.getElementById('task-input');
  const text = input.value.trim();
  if (text) {
    tasks = addTask(tasks, text);
    input.value = '';
    renderTasks();
  }
});

document.getElementById('task-input').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    document.getElementById('add-task-btn').click();
  }
});

document.querySelectorAll('.filters button').forEach(filterButton => {
  filterButton.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(btn => {
      btn.classList.remove('active');
    });
    filterButton.classList.add('active');

    currentFilter = filterButton.dataset.filter;
    renderTasks();
  });
});

renderTasks();
