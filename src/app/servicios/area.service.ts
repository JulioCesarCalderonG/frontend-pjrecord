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

}
