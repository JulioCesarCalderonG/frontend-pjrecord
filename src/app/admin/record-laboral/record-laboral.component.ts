import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalService } from 'src/app/servicios/personal.service';
@Component({
  selector: 'app-record-laboral',
  templateUrl: './record-laboral.component.html',
  styleUrls: ['./record-laboral.component.css']
})
export class RecordLaboralComponent implements OnInit {

  listPersonal?:Array<any>
  estado:string='1';
  inputBuscar:string="";
  constructor(
    private personalService:PersonalService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.mostrarPersonal();
  }
  mostrarPersonal(){
    this.personalService.getPersonal(this.estado, this.inputBuscar).subscribe(
      (data)=>{
        this.listPersonal = data.resp;
      },(error)=>{
        console.log(error);
      }
    )
  }
  buscar(event:string){
    this.inputBuscar = event;
    if (this.inputBuscar.length>=0) {
      this.personalService.getPersonal(this.estado,this.inputBuscar).subscribe(
        (data)=>{
          this.listPersonal=data.resp
        },(error)=>{
          console.log(error);

        }
      )
    }

  }
  mostrarPersonalTipo(event:any){
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrarPersonal();

  }
  redireccionarCrear(id:number,nombre:string, apellido:string){
    this.router.navigateByUrl(`admin/reporte-laboral/${id}/${nombre} ${apellido}`);
  }
}
