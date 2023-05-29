import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resp, ResultOrgano } from 'src/app/interfaces/organo-interface';
import { ResultSede } from 'src/app/interfaces/sede-interface';
import { OrganoService } from 'src/app/servicios/organo.service';
import { SedeService } from 'src/app/servicios/sede.service';

@Component({
  selector: 'app-organo',
  templateUrl: './organo.component.html',
  styleUrls: ['./organo.component.css']
})
export class OrganoComponent implements OnInit {

  listOrgano?:Resp[];
  listSedes?:Array<any>;
  organoForm:FormGroup;
  constructor(
    private organoService:OrganoService,
    private sedeService:SedeService,
    private fb:FormBuilder
  ) {
    this.organoForm = this.fb.group({
      nombre:['',Validators.required],
      sigla:['',Validators.required],
      sede:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarOrgano();
    this.mostrarSede();
  }
  mostrarOrgano(){
    this.organoService.getOrgano().subscribe(
      (data:ResultOrgano)=>{
        this.listOrgano = data.resp;
        console.log(this.listOrgano);

      },(error)=>{
        console.log(error);

      }
    )
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
  registrarOrgano(){
    const formData = new FormData();
    formData.append('nombre',this.organoForm.get('nombre')?.value);
    formData.append('sigla',this.organoForm.get('sigla')?.value);
    formData.append('id_sede',this.organoForm.get('sede')?.value);
    this.organoService.postOrgano(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarOrgano();
        this.cancelar();
      },(error)=>{
        console.log(error);

      }
    )


  }
  cancelar(){
    this.organoForm.setValue({
      nombre:'',
      sigla:'',
      sede:''
    })
  }
}
