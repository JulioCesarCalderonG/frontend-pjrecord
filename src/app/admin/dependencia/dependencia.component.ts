import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultOrgano } from 'src/app/interfaces/organo-interface';
import { DependenciaService } from 'src/app/servicios/dependencia.service';
import { OrganoService } from 'src/app/servicios/organo.service';

@Component({
  selector: 'app-dependencia',
  templateUrl: './dependencia.component.html',
  styleUrls: ['./dependencia.component.css']
})
export class DependenciaComponent implements OnInit {

  listUnidad?:Array<any>;
  listOrgano?:Array<any>;
  unidadForm:FormGroup;
  constructor(
    private dependenciaService:DependenciaService,
    private organoService:OrganoService,
    private fb:FormBuilder
  ) {
    this.unidadForm = this.fb.group({
      nombre:['',Validators.required],
      sigla:['',Validators.required],
      organo:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarUnidadOrganica();
    this.mostrarOrgano();
  }

  mostrarUnidadOrganica(){
    this.dependenciaService.getUnidad().subscribe(
      (data)=>{
        this.listUnidad = data.resp;
        console.log(this.listUnidad);

      },(error)=>{
        console.log(error);

      }
    )
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

  registrarUnidadOrganica(){
    const formData = new FormData();
    formData.append('nombre',this.unidadForm.get('nombre')?.value);
    formData.append('sigla',this.unidadForm.get('sigla')?.value);
    formData.append('id_organo',this.unidadForm.get('organo')?.value);

    this.dependenciaService.postUnidad(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarUnidadOrganica();
        this.cancelar();
      },(error)=>{
        console.log(error);

      }
    )


  }
  cancelar(){
    this.unidadForm.setValue({
      nombre:'',
      sigla:'',
      organo:''
    })
  }
}
