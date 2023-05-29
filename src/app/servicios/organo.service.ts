import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrganoService {

  url=`${environment.backendUrl}/organo`;
  constructor(private http:HttpClient, private router:Router) { }

  getOrgano():Observable<any>{
    return this.http.get(this.url);
  }
  postOrgano(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }

}
