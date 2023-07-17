import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdministradorGuard } from './guards/administrador.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { InterceptorInterceptor } from './interceptor/interceptor.interceptor';
import { ConsultaModule } from './consulta/consulta.module';
import { PruebaModule } from './prueba/prueba.module';
import { JefeModule } from './jefe/jefe.module';
import { JefeGuard } from './guards/jefe.guard';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    ConsultaModule,
    PruebaModule,
    JefeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    AdministradorGuard,
    //JefeGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
