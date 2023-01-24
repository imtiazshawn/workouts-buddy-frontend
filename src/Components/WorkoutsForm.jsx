import React, { useState } from 'react';
import {useWorkoutsContext} from '../Hooks/useWorkoutsContext';
import {useAuthContext} from '../Hooks/useAuthContext';

const WorkoutsForm = () => {
  // States
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
        setError('You must be logged in!');
        return
    }

    const workout = {title, load, reps};

    const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });

    const json = await response.json();

    if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
        setTitle('');
        setLoad('');
        setReps('');
        console.log('New Workout Added', json);
        setEmptyFields([]);
        setError(null);
        dispatch({type: 'CREATE_WORKOUT', payload: json});
    }
  }


  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add New Workout</h3>

        <label>Exercize For:</label>
        <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Load (in Kg):</label>
        <input 
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load') ? 'error' : ''}
        />

        <label>Reps</label>
        <input 
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
        />

        <button>Add Workout</button>

        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutsForm;