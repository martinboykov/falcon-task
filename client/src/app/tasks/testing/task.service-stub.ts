import { of } from 'rxjs';
import { TASKS } from './test.tasks';

export const tasksServiceStub = {
    tasks: TASKS,
    tasksSubject: of(TASKS),
    getAll: () => {},
    getById: () => of(TASKS[0]),
    add: () => {},
    update: () => {},
    delete: () => {},
};
