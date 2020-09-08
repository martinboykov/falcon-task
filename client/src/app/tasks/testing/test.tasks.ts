import { Task, TaskState } from '../models/task.model';

export const TASKS: Task[] = [
    {
        id: '101',
        title: 'test1',
        description: 'teset',
        state: TaskState.started,
    },
    {
        id: '202',
        title: 'test1',
        description: 'teset',
        state: TaskState.completed,
    },
];
