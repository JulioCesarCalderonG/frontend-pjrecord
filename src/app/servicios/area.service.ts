import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private url = `${environment.backendUrl}/area`
  constructor(private http:HttpClient, private router:Router) { }

  getAreas():Observable<any>{
    return this.http.get(this.url);
  }
  getAreaId(id:number|string):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  postAreas(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }
  putAreas(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,body)
  }
}
