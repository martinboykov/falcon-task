import { Task, TaskState } from '../models/task.model';

export const TASKS: Task[] = [
    {
        id: '101',
        title: 'test 101',
        description: 'test 101',
        state: TaskState.started,
    },
    {
        id: '202',
        title: 'test 202',
        description: 'test 202',
        state: TaskState.completed,
    },
];
