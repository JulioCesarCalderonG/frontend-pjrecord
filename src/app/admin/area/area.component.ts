import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaService } from 'src/app/servicios/area.service';
import { DependenciaService } from 'src/app/servicios/dependencia.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  listArea?:Array<any>;
  listUnidad?:Array<any>;
  areaForm:FormGroup;

  constructor(
    private areaService:AreaService,
    private dependenciaService:DependenciaService,
    private fb:FormBuilder
    ) {
      this.areaForm = this.fb.group({
        nombre:['',Validators.required],
        sigla:['',Validators.required],
        unidad:['',Validators.required]
      })
    }

  ngOnInit(): void {
    this.mostrarAreas();
    this.mostrarUnidadOrganica();
  }

  mostrarAreas(){
    this.areaService.getAreas().subscribe(
      (data)=>{
        this.listArea = data.resp;
      },(error)=>{
        console.log(error);
      }
    )
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

  registrarAreas(){
    const formData = new FormData();
    formData.append('nombre', this.areaForm.get('nombre')?.value);
    formData.append('sigla', this.areaForm.get('sigla')?.value);
    formData.append('id_unidad_organica', this.areaForm.get('unidad')?.value);

    this.areaService.postAreas(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarAreas();
        this.cancelar();
      }, (error)=>{
        console.log(error);
      }
    )
  }

  cancelar(){
    this.areaForm.setValue({
      nombre:'',
      sigla:'',
      unidad:'',
    })
  }

}
