import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private url = `${environment.backendUrl}/administrador`
  constructor(private http:HttpClient, private router:Router) { }

  getAdministrador(activo:string='1'):Observable<any>{
    return this.http.get(this.url,{params:{activo}});
  }

  getAdministradorId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postAdministrador(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }

  putAdministrador(body:FormData, id:string|number){
    return this.http.put(`${this.url}/${id}`, body)
  }

  deleteAdministrador(id:number, activo:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{activo:String(activo)}})
  }

}
