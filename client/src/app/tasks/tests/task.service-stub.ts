import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { TASKS } from './test.tasks';

export const tasksServiceStub = {
    tasks: TASKS,
    tasksSubject: new BehaviorSubject<Task[]>(TASKS),
    getAll: () => {},
    getById: () => {},
    add: () => {},
    update: () => {},
    delete: () => {},
};
