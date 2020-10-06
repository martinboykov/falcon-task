// import { projectReducer, TasksState } from './project.reducer';
// import { GET_PROJECTS, ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from './project.actions';
// import { PROJECTS } from '../testing/test.projects';
// let initialState: TasksState;
// describe('Reducer: Task', () => {
//     it('GET_PROJECTS', () => {
//         initialState = {
//             projects: [],
//         };
//         const action = { type: GET_PROJECTS, payload: PROJECTS } as any;
//         const result = projectReducer(initialState, action);
//         expect(result.projects.length).toBe(2);
//     });
//     it('ADD_PROJECT', () => {
//         initialState = {
//             projects: [],
//         };
//         const project = { ...PROJECTS[0] };
//         const action = { type: ADD_PROJECT, payload: project } as any;
//         const result = projectReducer(initialState, action);
//         expect(result.projects[0].title).toBe('test 101');
//         expect(result.projects[0].description).toBe('test 101');
//         expect(result.projects.length).toBe(1);
//     });
//     it('UPDATE_PROJECT', () => {
//         initialState = {
//             projects: PROJECTS,
//         };
//         const project = { ...PROJECTS[0], title: 'updated', description: 'updated' };
//         const action = { type: UPDATE_PROJECT, payload: project } as any;
//         const result = projectReducer(initialState, action);
//         expect(result.projects[0].title).toBe('updated');
//         expect(result.projects[0].description).toBe('updated');
//         expect(result.projects.length).toBe(2);
//     });
//     it('DELETE_PROJECT', () => {
//         initialState = {
//             projects: PROJECTS,
//         };
//         const action = { type: DELETE_PROJECT, payload: PROJECTS[0].id } as any;
//         const result = projectReducer(initialState, action);
//         expect(result.projects.length).toBe(1);
//     });
//     it('default', () => {
//         initialState = {
//             projects: PROJECTS,
//         };
//         const action = { type: 'NONE' } as any;
//         const result = projectReducer(initialState, action);

//         expect(result).toEqual(initialState);
//     });
// });
