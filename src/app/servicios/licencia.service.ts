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
  postLicencia(body:FormData):Observable<any>{
    return this.http.post(this.url,body)
  }
}
