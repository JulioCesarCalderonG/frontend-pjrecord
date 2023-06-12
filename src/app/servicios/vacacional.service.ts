import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VacacionalService {
  url=`${environment.backendUrl}/vacacional`
  constructor(private http:HttpClient, private router:Router) { }

  getVacacionalPersonal(id:string):Observable<any>{
    return this.http.get(`${this.url}/personal/${id}`)
  }
  postVacacional(body:FormData):Observable<any>{
    return this.http.post(this.url,body)
  }
}
