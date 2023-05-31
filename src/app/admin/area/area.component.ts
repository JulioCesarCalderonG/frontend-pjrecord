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
  areaEditarForm:FormGroup;
  ids?:string|number;
  estado:string="1";
  constructor(
    private areaService:AreaService,
    private dependenciaService:DependenciaService,
    private fb:FormBuilder
    ) {
      this.areaForm = this.fb.group({
        nombre:['',Validators.required],
        sigla:['',Validators.required],
        unidad:['',Validators.required]
      });
      this.areaEditarForm = this.fb.group({
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
    this.areaService.getAreas(this.estado).subscribe(
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

  editarAreas(){
    const formData = new FormData();
    formData.append('nombre',this.areaEditarForm.get('nombre')?.value);
    formData.append('sigla',this.areaEditarForm.get('sigla')?.value);
    formData.append('id_unidad_organica',this.areaEditarForm.get('unidad')?.value);

    this.areaService.putAreas(formData,this.ids!).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarAreas();
      },(error)=>{
        console.log(error);

      }
    )

  }

  obtenerDatosId(id:number){
    this.areaService.getAreaId(id).subscribe(
      (data)=>{
        this.areaEditarForm.setValue({
          nombre:data.resp.nombre,
          sigla:data.resp.sigla,
          unidad:data.resp.id_unidad_organica,
        })
        this.ids = data.resp.id;
      },(error)=>{
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
    this.areaEditarForm.setValue({
      nombre:'',
      sigla:'',
      unidad:'',
    })
  }


}
