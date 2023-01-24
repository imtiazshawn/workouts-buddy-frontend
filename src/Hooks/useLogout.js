import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: workouts } = useWorkoutsContext();

    const logout = () => {
        // Remove user from the localStorage
        localStorage.removeItem('user');

        // Update the dispatch action
        dispatch({ type: 'LOGOUT' });
        workouts({ type: 'SET_WORKOUTS', payload: null });
    }

    return { logout };
}