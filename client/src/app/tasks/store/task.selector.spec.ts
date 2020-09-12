import { getTask, getTasks } from './task.selector';
import { TASKS } from '../testing/test.tasks';
import { TasksState } from './task.reducer';
describe('TaskSelector', () => {
    describe('getTasks', () => {
        it('should return the tasks', () => {
            const tasks = TASKS;
            const tasksState: TasksState = {
                task: null,
                tasks: TASKS,
            };
            expect(getTasks.projector(tasksState)).toEqual(tasks);
        });
    });
    describe('getTask', () => {
        it('should return the task', () => {
            const task = TASKS[0];
            const tasksState: TasksState = {
                task: null,
                tasks: TASKS,
            };
            expect(getTask.projector(tasksState, { id: task.id })).toEqual(task);
        });
    });
});
