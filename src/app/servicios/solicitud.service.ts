import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  url=`${environment.backendUrl}/solicitud`
  constructor(private http:HttpClient, private router:Router) { }

  getSolicitudes(atendido:string):Observable<any>{
    return this.http.get(this.url,{params:{atendido}});
  }
  postSolicitud(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }
  putFirmar(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/firmar/${id}`,body);
  }
}
