import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AdminRoutingModule } from './admin/admin.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ConsultaRoutingModule } from './consulta/consulta.routing';
import { PruebaRoutingModule } from './prueba/prueba.routing';



const routes: Routes=[
  {path:'**', component:NopagefoundComponent},
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminRoutingModule,
    AuthRoutingModule,
    ConsultaRoutingModule,
    PruebaRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
