import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RecipesResolverService } from './tasks/tasks.resolver';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
    },
    {
        path: 'tasks',
        loadChildren: () =>
            import('./tasks/tasks.module').then((m) => m.TasksModule),
        resolve: {
            data: RecipesResolverService,
        },
    },

    {
        path: '**',
        component: NotFoundComponent,
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
