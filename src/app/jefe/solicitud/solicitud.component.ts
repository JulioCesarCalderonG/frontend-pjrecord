import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  listSolicitud?:Array<any>;
  atendido:string='0';
  constructor(
    private solicitudService:SolicitudService
  ) { }

  ngOnInit(): void {
    this.mostrarSolicitudes();
  }
  mostrarSolicitudes(){
    this.solicitudService.getSolicitudes(this.atendido).subscribe(
      (data)=>{
        this.listSolicitud = data.resp;
        console.log(this.listSolicitud);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
