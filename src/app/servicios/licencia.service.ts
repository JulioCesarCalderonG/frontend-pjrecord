import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {
  url=`${environment.backendUrl}/licencia`
  constructor(private http:HttpClient, private router:Router) { }

  getLicenciaPersonal(id:string):Observable<any>{
    return this.http.get(`${this.url}/personal/${id}`)
  }
  getLicenciaId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  postLicencia(body:FormData):Observable<any>{
    return this.http.post(this.url,body)
  }
  putLicencia(body:FormData,id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,body)
  }
  deleteLicencia(id:string|number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
}
