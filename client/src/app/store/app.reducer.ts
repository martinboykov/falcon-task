import { ActionReducerMap } from '@ngrx/store';
import * as fromProjects from '../projects/store/project.reducer';
import * as fromTasks from '../tasks/store/task.reducer';
// tslint:disable-next-line: no-empty-interface
export interface State {}

export interface AppState {
    tasks: fromTasks.TasksState;
    projects: fromProjects.ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: fromTasks.taskReducer,
  projects: fromProjects.projectReducer,
};
