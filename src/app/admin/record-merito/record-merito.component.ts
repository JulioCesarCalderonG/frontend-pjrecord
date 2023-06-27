import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalService } from 'src/app/servicios/personal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-record-merito',
  templateUrl: './record-merito.component.html',
  styleUrls: ['./record-merito.component.css']
})
export class RecordMeritoComponent implements OnInit {

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
        Swal.fire({
          title: 'Cargando datos!',
          html: 'Por favor espere.',
          timer: 1500,
          timerProgressBar: true,
          didOpen:()=>{
            Swal.showLoading();
          }}).then ((result)=>{
            if (result.dismiss === Swal.DismissReason.timer) { 
              this.listPersonal = data.resp;
        }});
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
    this.router.navigateByUrl(`admin/reporte-merito/${id}/${nombre} ${apellido}`);
  }

}
