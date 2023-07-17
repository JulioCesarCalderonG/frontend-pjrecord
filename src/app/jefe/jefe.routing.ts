import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { JefeComponent } from './jefe.component';
import { SolicitudComponent } from './solicitud/solicitud.component';


const routes: Routes = [
  {
    path: 'jefe',
    component: JefeComponent,
    children:[
      {path:'',component:SolicitudComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JefeRoutingModule {}
