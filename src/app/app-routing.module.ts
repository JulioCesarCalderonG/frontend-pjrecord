import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AdminRoutingModule } from './admin/admin.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';



const routes: Routes=[
  {path:'**', component:NopagefoundComponent},
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminRoutingModule,
    AuthRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
