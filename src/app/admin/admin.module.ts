import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AreaComponent } from './area/area.component';
import { CargoComponent } from './cargo/cargo.component';
import { DependenciaComponent } from './dependencia/dependencia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TipodocumentoComponent } from './tipodocumento/tipodocumento.component';
import { PersonalComponent } from './personal/personal.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { GeneralComponent } from './general/general.component';
import { OrganoComponent } from './organo/organo.component';
import { SedeComponent } from './sede/sede.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    AdminComponent,
    AreaComponent,
    CargoComponent,
    DependenciaComponent,
    TipodocumentoComponent,
    PersonalComponent,
    AdministradorComponent,
    GeneralComponent,
    OrganoComponent,
    SedeComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    AdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
