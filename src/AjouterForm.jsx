// Ajouter.jsx
import { useState } from 'react';
import './style.css';

// eslint-disable-next-line react/prop-types
export default function AddTask({ onAddTask }) {
  const [value, setValue] = useState('');

  const handleAddTask = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAddTask(value);
    setValue('');
  };

  return (
    <div className='ajoutContainer' style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <form onSubmit={handleSubmit}>
        <input
          className='saisie'
          type="text"
          placeholder='Ajouter tâche...'
          value={value}
          onChange={handleAddTask}
          style={{width: '65vw', marginRight: '10px', background:'transparent', border: '1px solid white', color:'white' }}
        />
        <button
          style={{ width: '100px', height: '40px', padding: '8px', border: '1px', borderRadius: '10px', fontSize: '20px', backgroundColor: 'rgb(0, 157, 255)', color: 'white' }}
          type='submit'
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
