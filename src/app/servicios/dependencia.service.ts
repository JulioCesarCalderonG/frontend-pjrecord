import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DependenciaService {

  private url = `${environment.backendUrl}/unidadorganica`;
  constructor(private http:HttpClient, private router:Router) { }

  getUnidad():Observable<any>{
    return this.http.get(this.url);
  }
  postUnidad(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }
}
