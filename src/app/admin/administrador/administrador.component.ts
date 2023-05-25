import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/servicios/administrador.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  listAdministrador?:Array<any>

  constructor(private administradorService:AdministradorService) { }

  ngOnInit(): void {
    this.mostrarAdministrador();
  }

  mostrarAdministrador(){
    this.administradorService.getAdministrador().subscribe(
      (data)=>{
        this.listAdministrador = data.resp;
      }, (error)=>{
        console.log(error);
        
      }
    )
  }

}
