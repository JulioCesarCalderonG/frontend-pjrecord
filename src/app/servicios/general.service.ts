import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private url = `${environment.backendUrl}/general`
  constructor(private http:HttpClient, private router:Router) { }

  getGeneral(tipofiltro:string,dato:string):Observable<any>{
    return this.http.get(this.url,{params:{tipofiltro,dato}});
  }

  getGeneralId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postGeneral(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }

  putGeneral(body:FormData, id:string|number){
    return this.http.put(`${this.url}/${id}`, body);
  }
}
