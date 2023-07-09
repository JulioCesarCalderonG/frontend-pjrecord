import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistorialService } from 'src/app/servicios/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  listHistorial?: Array<any>;
  tipofiltro: string = '';
  historialForm:FormGroup;
  datobuscar: string = '';

  constructor(
    private fb:FormBuilder,
    private historialService: HistorialService
  ) { 
    this.historialForm = this.fb.group({
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarHistorial();
  }

  mostrarHistorial(){
    this.historialService.getHistorial(this.tipofiltro).subscribe(
      (data)=>{
        this.listHistorial = data.resp;
      }, (error)=>{
        console.log(error);
      }
    )
  }

  filtrar() {
    if (this.tipofiltro !== '' && this.datobuscar !== '') {
      console.log(this.tipofiltro, this.datobuscar);
      this.mostrarHistorial();
    }
    if (this.tipofiltro === '0') {
      this.tipofiltro = '';
      this.datobuscar = '';
      this.mostrarHistorial();
    }
  }


  tipoFiltro(event: any) {
    this.tipofiltro = event.target.value;
    console.log(this.tipofiltro);
  }

}
