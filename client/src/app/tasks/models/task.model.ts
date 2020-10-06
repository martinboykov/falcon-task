export enum TaskState {
    completed = 'completed',
    started = 'started',
}
export enum PriorityType {
    low,
    medium,
    hight
}
export interface Task {
    id: string;
    title: string;
    description: string;
    priority: PriorityType;
    state: TaskState;
}
