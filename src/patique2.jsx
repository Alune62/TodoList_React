import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export default function patique2() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'simulation de tache à faire', completed: false },
        { id: 2, title: 'tache à faire', completed: false },
    ]);
    console.log(todos);
    const [value, setValue] = useState('');
    const [checked, setChecked] = useState(false);
    const [filtered, setFiltered] = useState ('all')

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

    const handleChecked = (e) => {
        setChecked(e.target.checked);
    };

    const FilteredTodo = todos.filter(todo => {
        if(filtered === "all") return true
        if(filtered === "done") return todo.completed
        if(filtered === "todo") return !todo.completed
    })
    // useEffect(() => {
    //     // Mettre à jour le filtre pour afficher toutes les todos par défaut
    //     setFiltered('all');
    // }, []);

    return (
        <div>
            <h1 style={{ display: 'flex', justifyContent: 'center', margin: 0, padding: '10px', color: 'white', background: 'rgb(0, 157, 255)' }}> TodoList </h1>

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

            <div className="filterButton" style={{ margin: '3rem' }}>
                <button  type='button' onClick={() => setFiltered('all')} style={{ padding: '10px', width: '33%', background: 'transparent', border: '1px solid white', color: 'white', borderRadius: '10px', }}>Toutes</button>
                <button  type='button' onClick={() => setFiltered('todo')} style={{ padding: '10px', width: '33%', background: 'transparent', border: '1px solid white', color: 'white', borderRadius: '10px' }}>A Faire</button>
                <button  type='button' onClick={() => setFiltered('done')} style={{ padding: '10px', width: '33%', background: 'transparent', border: '1px solid white', color: 'white', borderRadius: '10px' }}>Faits</button>
            </div>

            <div className="todoList" style={{ margin: '2rem' }}>
                {FilteredTodo.map(todo => (
                    <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px', color: 'white', border: '1px solid white', borderRadius: '10px' }}>
                        <input type="checkbox" checked={checked.id} onChange={handleChecked} style={{ marginLeft: '1rem' }} />
                        <p style={{ marginLeft: '8px' }}>{todo.title}</p>
                        <button style={{ background: 'transparent', fontSize: '20px', border: 'none', marginRight: '1rem' }}>
                            <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red' }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
