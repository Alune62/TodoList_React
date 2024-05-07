import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";

export default function patique2() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'simulation de tache à faire', completed: false },
        { id: 2, title: 'tache à faire', completed: true },
    ]);
    console.log(todos);
    const [value, setValue] = useState('');
    const [checked, setChecked] = useState(false);
    const [filtered, setFiltered] = useState('all')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim() !== '') {
            setTodos([...todos, { id: todos.length + 1, title: value, completed: false }]);
            setValue(''); // Réinitialise la valeur du champ de saisie
        }
    }

    const addTask = (e) => {
        setValue(e.target.value);
    };

    const handleCheck = (todoID) => {
        const updatedTodos = todos.map(todo => {
          if (todo.id === todoID) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
        setTodos(updatedTodos);
      };

    const FilteredTodo = todos.filter(todo => {
        if (filtered === "all") return true
        if (filtered === "done") return todo.completed
        if (filtered === "todo") return !todo.completed
    })


    const handleDelete = (todoId) => {
        setTodos(todos.filter((todo => todo.id !== todoId)))
    }
   

    return (
        <div>
            <div className="header">
                <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white', background: 'rgb(0, 157, 255)' }}>TodoList</h1> 
                <button onClick={() => navigate('/')} style={{background: 'transparent', border: 'none', color: 'white', fontSize: '20px'}}>Retour</button> 
                </div>
            

            <div className="formControl" style={{ marginTop: '5rem', }}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ajouter vos taches"
                        value={value} // Utilise la valeur de l'état value
                        onChange={addTask}
                        style={{ width: '65vw', padding: '10px', borderRadius: '10px', background: 'transparent', border: '1px solid white', color: 'white' }}
                    />

                    <button type="submit" style={{ marginLeft: '1rem', padding: '8px', width: '100px', borderRadius: '10px', background: 'rgb(0, 157, 255)', color: 'white', fontSize: '25px' }}>Ajouter</button>
                </form>
            </div>

            <div className="filterButton">
                <button
                    className={filtered === 'all' ? 'filter active' : 'filter'}
                    type="button"
                    onClick={() => setFiltered('all')}>Toutes</button>
                <button
                    className={filtered === 'todo' ? 'filter active' : 'filter'}
                    type='button'
                    onClick={() => setFiltered('todo')}>A Faire</button>
                <button
                    className={filtered === 'done' ? 'filter active' : 'filter'}
                    type='button'
                    onClick={() => setFiltered('done')}>Faits</button>
            </div>

            <div className="todoList" style={{padding:'2rem' }}>
                {FilteredTodo.map(todo => (
                    <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px', height: '4vh', color: 'white', border: '1px solid white', borderRadius: '10px' }}>
                        <input type="checkbox" checked={todo.completed} onChange={()=>handleCheck(todo.id)} style={{ marginLeft: '1rem' }} />
                        <p style={{ marginLeft: '8px', fontSize: '20px', textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</p>
                        <button style={{ background: 'transparent', fontSize: '20px', border: 'none', marginRight: '1rem' }} onClick={() => handleDelete(todo.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red' }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
