import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private url = `${environment.backendUrl}/personal`
  constructor(private http:HttpClient, private router:Router) { }

  getPersonal(estado:string='1'):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }

  getPersonalId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postPersonal(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }

  putPersonal(body:FormData, id:string|number){
    return this.http.put(`${this.url}/${id}`, body);
  }

  deletePersonal(id:number, estado:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{estado:String(estado)}});
  }

}
