import { Action } from '@ngrx/store';
import { Project } from '../models/project.model';
import { Task } from 'src/app/tasks/models/task.model';

export const GET_PROJECTS = '[Project] Get Projects';
export const ADD_PROJECT = '[Project] Add Project';
export const UPDATE_PROJECT = '[Project] Update Project';
export const DELETE_PROJECT = '[Project] Delete Project';
export const ADD_TASK_TO_PROJECT = '[Project] Add Task To Project';
export const UPDATE_TASK_FROM_PROJECT = '[Project] Update Task From Project';
export const DELETE_TASK_FROM_PROJECT = '[Project] Delete Task From Project';

export class GetProjects implements Action {
    readonly type = GET_PROJECTS;

    constructor(public payload: Project[]) {}
}

export class AddProject implements Action {
    readonly type = ADD_PROJECT;

    constructor(public payload: Project) {}
}

export class UpdateProject implements Action {
    readonly type = UPDATE_PROJECT;
    constructor(public payload: Project) {}
}
export class DeleteProject implements Action {
    readonly type = DELETE_PROJECT;
    constructor(public payload: string) {}
}
export class AddTaskToProject implements Action {
    readonly type = ADD_TASK_TO_PROJECT;
    constructor(public payload: Task) {}
}
export class UpdateTaskFromProject implements Action {
    readonly type = UPDATE_TASK_FROM_PROJECT;
    constructor(public payload: Task) {}
}
export class DeleteTaskFromProject implements Action {
    readonly type = DELETE_TASK_FROM_PROJECT;
    constructor(public payload: Task) {}
}

export type ProjectActions =
    | GetProjects
    | AddProject
    | UpdateProject
    | DeleteProject
    | AddTaskToProject
    | UpdateTaskFromProject
    | DeleteTaskFromProject;

