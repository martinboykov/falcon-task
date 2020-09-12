import { createFeatureSelector, createSelector, Store } from '@ngrx/store';

import { TasksState } from './task.reducer';

export * from '../../store/app.reducer';

export const getTasksState = createFeatureSelector<TasksState>('tasks');
export const getTasks = createSelector(
    getTasksState,
    (state: TasksState) => state.tasks
);
export const getTask = createSelector(getTasksState, (state: TasksState, param) =>
    state.tasks.find((task) => task.id.toString() === param.id)
);
