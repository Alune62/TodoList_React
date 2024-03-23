// App.jsx
import { useState, useEffect } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddTask from './Ajouter';
import Task from './Taches';
import './app.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      });
  }, []);

  const addTask = (newTask) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: newTask,
        completed: false
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        setTodos(prevTodos => [...prevTodos, { id: data.id, title: newTask, completed: false }]);
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const handleDeleteTodo = async (todoId) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div>
      <div className='header'>
        <h1>TodoList</h1>
        <FontAwesomeIcon icon={faUser} style={{fontSize: '50px', marginRight: '30px'}}/>

      </div>
      <div>
        <AddTask onAddTask={addTask} />
        <Task todos={todos} onDelete={handleDeleteTodo}/>
      </div>
    </div>
  );
}

export default App;
