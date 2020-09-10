import { of } from 'rxjs';
import { TASKS } from './test.tasks';

export const tasksServiceStub = {
    tasks: TASKS,
    tasksSubject: of(TASKS),
    getAll: () => of(TASKS),
    getById: () => of(TASKS[0]),
    add: () => of(TASKS[0]),
    update: () => of(TASKS[0]),
    delete: () => of(TASKS[0]),
};
