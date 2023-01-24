import React, { useEffect } from 'react';
import WorkoutDetails from '../Components/WorkoutDetails';
import WorkoutsForm from '../Components/WorkoutsForm';
import {useWorkoutsContext} from '../Hooks/useWorkoutsContext';
import {useAuthContext} from '../Hooks/useAuthContext';

const Home = () => {
  // States
  const {workouts, dispatch} = useWorkoutsContext();
  const { user } = useAuthContext();

  // Hooks
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {'Authorization': `Bearer ${user.token}`}
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json});
      };
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className='home'>
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
      </div>
      <WorkoutsForm/>
    </div>
  )
}

export default Home;