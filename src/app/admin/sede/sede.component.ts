import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resp, ResultSede } from 'src/app/interfaces/sede-interface';
import { SedeService } from 'src/app/servicios/sede.service';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  listSedes?:Array<Resp>;
  sedeForm:FormGroup;
  constructor(
    private sedeService:SedeService,
    private fb:FormBuilder
  ) {
    this.sedeForm = this.fb.group({
      nombre:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarSede();
  }
  mostrarSede(){
    this.sedeService.getSedes().subscribe(
      (data:ResultSede)=>{
        this.listSedes = data.resp;
        console.log(this.listSedes);

      },
      (error)=>{
        console.log(error);

      }
    )
  }
  registrarSede(){
    const formData = new FormData();
    formData.append('nombre',this.sedeForm.get('nombre')?.value);
    this.sedeService.postSede(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarSede();
        this.cancelar();
      },(error)=>{
        console.log(error);

      }
    )

  }
  cancelar(){
    this.sedeForm.setValue({
      nombre:''
    })
  }
}
