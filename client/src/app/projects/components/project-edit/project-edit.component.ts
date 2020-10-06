import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { Project } from '../../models/project.model';
import { Location } from '@angular/common';

@Component({
    selector: 'app-project-edit',
    templateUrl: './project-edit.component.html',
    styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit, OnDestroy {
    project: Project;
    projectSubscription: Subscription;
    id: string;
    editMode: boolean;
    success: boolean;
    projectForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(60)]],
        description: ['', [Validators.required, Validators.maxLength(100)]],
    });
    constructor(
        private projectsService: ProjectsService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    get title() {
        return this.projectForm.get('title');
    }
    get description() {
        return this.projectForm.get('description');
    }
    public hasError = (controlName: string, errorName: string) => {
        return this.projectForm.controls[controlName].hasError(errorName);
    };
    ngOnInit(): void {
        this.success = false;
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.editMode = true;
            this.projectSubscription = this.route.data.subscribe(
                (res: Data) => {
                    if (this.editMode) {
                        this.project = res.project;
                        this.projectForm.patchValue({
                            title: this.project.title,
                            description: this.project.description,
                        });
                    }
                }
            );
        } else {
            this.editMode = false;
        }
    }
    goBack() {
        this.location.back();
    }
    onSubmit() {
        this.projectsService.add(this.projectForm.value).subscribe(() => {
            this.success = true;
        });
    }
    onEditProject() {
        this.project = {
            ...this.project,
            ...this.projectForm.value,
        };
        this.projectSubscription.add(
            this.projectsService.update(this.project).subscribe(() => {
                this.success = true;
            })
        );
    }
    onDelete() {
        this.projectsService.delete(this.id).subscribe((res) => {
            console.log(res);
        });
    }

    ngOnDestroy() {
        if (this.projectSubscription) {
            this.projectSubscription.unsubscribe();
        }
    }
}
