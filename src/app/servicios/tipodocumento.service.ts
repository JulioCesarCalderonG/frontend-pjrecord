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

  getTipodocumentoId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postTipodocumento(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }

  putTipodocumento(body:FormData, id:string|number){
    return this.http.put(`${this.url}/${id}`,body);
  }


}
