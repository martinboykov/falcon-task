import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SideNavListComponent } from './navigation/side-nav-list/side-nav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NotFoundComponent } from './not-found/not-found.component';
const materialModules = [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,
    MatProgressBarModule,
];
@NgModule({
    declarations: [SideNavListComponent, HeaderComponent, NotFoundComponent],
    imports: [CommonModule, ...materialModules, RouterModule],
    exports: [
        ...materialModules,
        SideNavListComponent,
        HeaderComponent,
        NotFoundComponent,
    ],
    providers: [],
})
export class SharedModule {}
