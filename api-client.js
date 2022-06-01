const baseUrl = 'http://localhost:3000/';

const getTasks = async () => {
  try {
    const response = await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
    });
    const tasks = await response.json();
    return tasks;
  }
  catch (error) {
    console.log(error);
  }
};

const postTask = async (task) => {
  try {
    await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
          "Content-Type": "application/json"
      }
    });
  }
  catch (error) {
    console.log(error);
  }
};

const deleteTask = async (taskId) => {
  try{
    await fetch(baseUrl + taskId, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
    });
  }
  catch (error) {
    console.log(error);
  }
};

const putTask = async (taskId, dataToPut) => {
  try {
    await fetch(baseUrl + taskId, {
      method: "PUT",
      body: JSON.stringify(dataToPut),
      headers: {
          "Content-Type": "application/json"
      }
    });
  }
  catch (error) {
    console.log(error);
  }
};