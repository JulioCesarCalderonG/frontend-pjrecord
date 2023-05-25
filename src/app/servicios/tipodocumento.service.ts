import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {

  private url = `${environment.backendUrl}/tipodocumento`
  constructor(private http:HttpClient, private router:Router) { }

  getTipodocumento():Observable<any>{
    return this.http.get(this.url);
  }

}
