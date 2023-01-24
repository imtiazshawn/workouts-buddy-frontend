import { useContext } from "react";
import { WorkoutsContext } from "../Context/WorkoutsContext";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);

    if (!context) {
        throw Error('useWorkoutsContext must be inside of an WorkoutsContextProvider');
    };

    return context;
};