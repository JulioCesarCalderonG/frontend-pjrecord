import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private url = `${environment.backendUrl}/historial`
  constructor(private http:HttpClient, private router:Router) { }

  getHistorialAdmin(id:string):Observable<any>{
    return this.http.get(`${this.url}/personal/${id}`);
  }

  getHistorial(tipofiltro:string):Observable<any>{
    return this.http.get(this.url,{params:{tipofiltro}});
  }

}
