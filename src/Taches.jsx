// Taches.jsx
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export default function Task({ todos, onDelete }) {
  const [filtered, setFiltered] = useState('all');
  const [stateTodos, setStateTodos] = useState([])

  useEffect(() => {
    setStateTodos(todos);
  }, [todos]); // Utilisation d'un tableau vide pour que l'effet s'exécute uniquement au montage initial


  const FilteredTodo = stateTodos.filter(todo => {
    if (filtered === "all") return true;
    if (filtered === "done") return todo.completed;
    if (filtered === "todo") return !todo.completed;
  });

  const handleDelete = (todoID) => {
    const removedTodo = stateTodos.filter(todo => todo.id !== todoID);
    setStateTodos(removedTodo);
    onDelete(todoID)
  };

  const handleChecked = (todoID) => {
    setStateTodos(prevTodos => (
      prevTodos.map(todo => (
        todo.id === todoID ? { ...todo, checked: !todo.checked } : todo
      ))
    ));
  };

  return (
    <div className='todolist'>
      <main>
        <div>
          <button type='button' onClick={() => setFiltered('all')}>Toutes</button>
          <button type='button' onClick={() => setFiltered('todo')}>A Faire</button>
          <button type='button' onClick={() => setFiltered('done')}>Faits</button>
        </div>
        <table style={{ color: 'white', fontSize: '40px', borderCollapse: 'collapse' }}>
          <tbody>
            {FilteredTodo.map(todo => (
              <tr key={todo.id}>
                <td style={{ paddingRight: '10px' }}>
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => handleChecked(todo.id)}
                    id={`todo-${todo.id}`}
                  />
                </td>
                <td style={{ paddingRight: '10px' }}>
                  <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
                </td>
                <td>
                  <button onClick={() => handleDelete(todo.id)} style={{ backgroundColor: 'transparent', border: 'none' }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
