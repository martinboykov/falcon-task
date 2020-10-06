import {
    TaskActions,
    GET_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
} from './task.actions';
import * as fromRoot from '../../store/app.reducer';
import { Task } from '../models/task.model';

export interface TasksState {
    tasks: Task[];
}

// export interface State extends fromRoot.State {
//     task: TasksState;
// }

const initialState: TasksState = {
    tasks: [],
};

export function taskReducer(state: TasksState = initialState, action: TaskActions) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: [...action.payload],
            };

        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: [
                    ...state.tasks.map((task) => {
                        if (task.id === action.payload.id) {
                            return action.payload;
                        } else {
                            return task;
                        }
                    }),
                ],
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: [
                    ...state.tasks.filter((task) => task.id !== action.payload),
                ],
            };
        default: {
            return state;
        }
    }
}
