export enum PriorityType {
    low,
    medium,
    high,
}
export enum TaskState {
    completed = 'completed',
    started = 'started',
}
export interface Task {
    id: string;
    title: string;
    description: string;
    state: TaskState;
    priority?: PriorityType;
}
