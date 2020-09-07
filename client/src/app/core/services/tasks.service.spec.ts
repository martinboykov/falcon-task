import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TasksService', () => {
    let service: TasksService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TasksService],
        });
        service = TestBed.inject(TasksService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
