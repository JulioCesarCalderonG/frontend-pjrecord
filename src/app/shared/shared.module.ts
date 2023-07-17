import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BuscarPersonasComponent } from './buscar-personas/buscar-personas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarJefeComponent } from './sidebar-jefe/sidebar-jefe.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    BuscarPersonasComponent,
    SidebarJefeComponent
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    BuscarPersonasComponent,
    SidebarJefeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
