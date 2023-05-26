import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DependenciaService } from 'src/app/servicios/dependencia.service';

@Component({
  selector: 'app-dependencia',
  templateUrl: './dependencia.component.html',
  styleUrls: ['./dependencia.component.css']
})
export class DependenciaComponent implements OnInit {

  listDependencia?:Array<any>
  dependenciaForm:FormGroup;
  constructor(
    private dependenciaService:DependenciaService,
    private fb:FormBuilder
  ) {
    this.dependenciaForm = this.fb.group({
      descripcion:['',Validators.required]
    })
  }

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

  registrarDependencia(){
    const formData = new FormData();
    formData.append('descripcion',this.dependenciaForm.get('descripcion')?.value);

    this.dependenciaService.postDependencia(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarDependencias();
      },(error)=>{
        console.log(error);

      }
    )


  }
  cancelar(){
    this.dependenciaForm.setValue({
      descripcion:''
    })
  }
}
