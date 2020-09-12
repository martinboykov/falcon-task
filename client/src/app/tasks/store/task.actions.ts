import { Action } from '@ngrx/store';
import { Task } from '../models/task.model';

export const GET_TASKS = '[Task] Get Tasks';
export const ADD_TASK = '[Task] Add Task';
export const UPDATE_TASK = '[Task] Update Task';
export const DELETE_TASK = '[Task] Delete Task';

export class GetTasks implements Action {
    readonly type = GET_TASKS;

    constructor(public payload: Task[]) {}
}

export class AddTask implements Action {
    readonly type = ADD_TASK;

    constructor(public payload: Task) {}
}

export class UpdateTask implements Action {
    readonly type = UPDATE_TASK;
    constructor(public payload: Task) {}
}

export class DeleteTask implements Action {
    readonly type = DELETE_TASK;
    constructor(public payload: string) {}
}

export type TaskActions = GetTasks | AddTask | UpdateTask | DeleteTask;
