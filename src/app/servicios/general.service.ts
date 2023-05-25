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

  getGeneral():Observable<any>{
    return this.http.get(this.url);
  }

}
