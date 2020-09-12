import { taskReducer, TasksState } from './task.reducer';
import { GET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from './task.actions';
import { TASKS } from '../testing/test.tasks';
let initialState: TasksState;
describe('Reducer: Task', () => {
    it('GET_TASKS', () => {
        initialState = {
            task: null,
            tasks: [],
        };
        const action = { type: GET_TASKS, payload: TASKS } as any;
        const result = taskReducer(initialState, action);
        expect(result.tasks.length).toBe(2);
    });
    it('ADD_TASK', () => {
        initialState = {
            task: null,
            tasks: [],
        };
        const task = { ...TASKS[0] };
        const action = { type: ADD_TASK, payload: task } as any;
        const result = taskReducer(initialState, action);
        expect(result.tasks[0].title).toBe('test 101');
        expect(result.tasks[0].description).toBe('test 101');
        expect(result.tasks.length).toBe(1);
    });
    it('UPDATE_TASK', () => {
        initialState = {
            task: null,
            tasks: TASKS,
        };
        const task = { ...TASKS[0], title: 'updated', description: 'updated' };
        const action = { type: UPDATE_TASK, payload: task } as any;
        const result = taskReducer(initialState, action);
        expect(result.tasks[0].title).toBe('updated');
        expect(result.tasks[0].description).toBe('updated');
        expect(result.tasks.length).toBe(2);
    });
    it('DELETE_TASK', () => {
        initialState = {
            task: null,
            tasks: TASKS,
        };
        const action = { type: DELETE_TASK, payload: TASKS[0].id } as any;
        const result = taskReducer(initialState, action);
        expect(result.tasks.length).toBe(1);
    });
    it('default', () => {
        initialState = {
            task: null,
            tasks: TASKS,
        };
        const action = { type: 'NONE' } as any;
        const result = taskReducer(initialState, action);

        expect(result).toEqual(initialState);
    });
});
