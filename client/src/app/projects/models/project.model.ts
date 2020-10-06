import { Task } from 'src/app/tasks/models/task.model';

export interface Project {
    id: string;
    title: string;
    description: string;
    tasks?: Task[];
}
