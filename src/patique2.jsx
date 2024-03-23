import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';



export default function Pratique2() {
    const [todos, setTodos] = useState([])
    const [value, setValue] = useState('')
    const [checked, setChecked] = useState(false)
    const [filtered, setFiltered] = useState('all')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTodos(data)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!value.trim()) return false
        addTask(value)
        setValue('')
    }

const FilteredTodos = todos.filter(todo => {
    if(filtered === "all") return true
    if(filtered ==="done") return todo.completed
    if(filtered ==="todo") return !todo.completed
})
      // if(checked) return todo.completed

const addTask = async(newTask) => {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            title: newTask,
            completed: false
        })
    })

     const data = await response.json()
     console.log(data);
     setTodos(prevTodos => [...prevTodos, { id: data.id, title: newTask, completed: false }]);
     
    } catch (error){
        console.error('Error adding task:', error);
    }
}

const DeleteTask = async(todoId) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'DELETE'
    })

    setTodos(todos.filter(todo => todo.id !== todoId))
}


return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ajouter tache"
                    value={value}
                    onChange={(e) => setValue(e.target.value)} />
                <button type="submit">Ajouter</button>
            </form>
            <div>
                <button type="button" onClick={()=> setFiltered("all")}>Toutes</button>
                <button type="button" onClick={()=> setFiltered("done")}>Fait(s)</button>
                <button type="button" onClick={()=> setFiltered("todo")}>A Faire</button>
            </div>
            <table>
                <tbody>
                    {FilteredTodos.map(todo => (
                        <tr key={todo.id}>
                            <td><input type="checkbox" checked={checked.id} onChange={() => setChecked(!checked)} /></td>
                            <td style={{ color: 'white' }}>{todo.title}</td>
                            <td>
                                <button type="button" onClick={() => DeleteTask(todo.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}