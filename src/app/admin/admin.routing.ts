import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AreaComponent } from './area/area.component';
import { CargoComponent } from './cargo/cargo.component';
import { DependenciaComponent } from './dependencia/dependencia.component';
import { TipodocumentoComponent } from './tipodocumento/tipodocumento.component';
import { PersonalComponent } from './personal/personal.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { GeneralComponent } from './general/general.component';
import { OrganoComponent } from './organo/organo.component';
import { SedeComponent } from './sede/sede.component';


const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'grafica1', component: Grafica1Component },
            { path: 'area', component: AreaComponent },
            { path: 'cargo', component: CargoComponent },
            { path: 'unidadorganica', component: DependenciaComponent },
            { path: 'tipodocumento', component: TipodocumentoComponent },
            { path: 'personal', component: PersonalComponent },
            { path: 'administrador', component: AdministradorComponent },
            { path: 'general', component: GeneralComponent },
            { path: 'organojurisdiccional', component: OrganoComponent },
            { path: 'sede', component: SedeComponent },
        ]
    },
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
