import { Component, OnInit } from '@angular/core';
import { DependenciaService } from 'src/app/servicios/dependencia.service';

@Component({
  selector: 'app-dependencia',
  templateUrl: './dependencia.component.html',
  styleUrls: ['./dependencia.component.css']
})
export class DependenciaComponent implements OnInit {

  listDependencia?:Array<any>

  constructor(private dependenciaService:DependenciaService) { }

  ngOnInit(): void {
    this.mostrarDependencias();
  }

  mostrarDependencias(){
    this.dependenciaService.getDependencias().subscribe(
      (data)=>{
        this.listDependencia = data.resp;
        
      },(error)=>{
        console.log(error);
        
      }
    )
  }

}
