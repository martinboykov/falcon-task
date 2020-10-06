import { createFeatureSelector, createSelector, Store } from '@ngrx/store';

import { ProjectsState } from './project.reducer';

export * from '../../store/app.reducer';

export const getProjectsState = createFeatureSelector<ProjectsState>('projects');
export const getProjects = createSelector(
    getProjectsState,
    (state: ProjectsState) => state.projects
);
export const getProject = createSelector(getProjectsState, (state: ProjectsState, param) =>
    state.projects.find((project) => project.id.toString() === param.id)
);
