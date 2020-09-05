import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SideNavListComponent } from './navigation/side-nav-list/side-nav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';

const materialModules = [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
];

@NgModule({
    declarations: [SideNavListComponent, HeaderComponent, WelcomeComponent],
    imports: [AppRoutingModule, ...materialModules],
    exports: [
        AppRoutingModule,
        ...materialModules,
        SideNavListComponent,
        HeaderComponent,
    ],
})
export class CoreModule {}
