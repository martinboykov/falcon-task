export enum TaskState {
    completed = 'completed',
    started = 'started',
}
export interface Task {
    id: string;
    title: string;
    description: string;
    state: TaskState;
}
