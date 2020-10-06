import {
    ProjectActions,
    GET_PROJECTS,
    ADD_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    ADD_TASK_TO_PROJECT,
    UPDATE_TASK_FROM_PROJECT,
    DELETE_TASK_FROM_PROJECT,
} from './project.actions';
import * as fromRoot from '../../store/app.reducer';
import { Project } from '../models/project.model';

export interface ProjectsState {
    projects: Project[];
}

// export interface State extends fromRoot.State {
//     project: ProjectsState;
// }

const initialState: ProjectsState = {
    projects: [],
};

export function projectReducer(state = initialState, action: ProjectActions) {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: [...action.payload],
            };

        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
            };
        case UPDATE_PROJECT:
            return {
                ...state,
                projects: [
                    ...state.projects.map((project) => {
                        if (project.id === action.payload.id) {
                            return action.payload;
                        } else {
                            return project;
                        }
                    }),
                ],
            };
        case DELETE_PROJECT:
            console.log(state);
            console.log(action.payload);

            return {
                ...state,
                projects: [
                    ...state.projects.filter(
                        (project) =>
                            project.id.toString() !== action.payload.toString()
                    ),
                ],
            };
        case ADD_TASK_TO_PROJECT:
            return {
                ...state,
                projects: [
                    ...state.projects.map((project) => {
                        console.log(action.payload.project);

                        if (project.id === action.payload.project) {
                            console.log(project);

                            return (project = {
                                ...project,
                                tasks: [...project.tasks, action.payload],
                            });
                        }
                        return project;
                    }),
                ],
            };
        case UPDATE_TASK_FROM_PROJECT:
            return {
                ...state,
                projects: [
                    ...state.projects.map((project) => {
                        console.log(action.payload.project);

                        if (project.id === action.payload.project) {
                            console.log(project);

                            return (project = {
                                ...project,
                                tasks: [
                                    ...project.tasks.map((task) => {
                                        if (task.id === action.payload.id) {
                                            return (task = {
                                                ...action.payload,
                                            });
                                        }
                                        return task;
                                    }),
                                ],
                            });
                        }
                        return project;
                    }),
                ],
            };
        case DELETE_TASK_FROM_PROJECT:
            return {
                ...state,
                projects: [
                    ...state.projects.map((project) => {
                        console.log(action.payload.project);

                        if (project.id === action.payload.project) {
                            console.log(project);

                            return (project = {
                                ...project,
                                tasks: [
                                    ...project.tasks.filter(
                                        (task) => task.id !== action.payload.id
                                    ),
                                ],
                            });
                        }
                        return project;
                    }),
                ],
            };

        default: {
            return state;
        }
    }
}
