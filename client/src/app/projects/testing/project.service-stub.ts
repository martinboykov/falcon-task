import { of } from 'rxjs';
import { PROJECTS } from 'src/app/projects/testing/project.tasks';

export const projectsServiceStub = {
    projects: PROJECTS,
    projectsSubject: of(PROJECTS),
    getAll: () => of(PROJECTS),
    getById: () => of(PROJECTS[0]),
    add: () => of(PROJECTS[0]),
    update: () => of(PROJECTS[0]),
    delete: () => of(PROJECTS[0]),
};
