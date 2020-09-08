import {  of } from 'rxjs';
import { TASKS } from './test.tasks';

export const tasksServiceStub = {
    tasks: TASKS,
    tasksSubject: of(TASKS),
    getAll: () => {},
    getById: () => {},
    add: () => {},
    update: () => {},
    delete: () => {},
};
