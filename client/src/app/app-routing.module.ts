import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RecipesResolverService } from './tasks/tasks.resolver';

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
        redirectTo: '', // TODO: errorpage
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
