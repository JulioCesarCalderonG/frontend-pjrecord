import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaService } from 'src/app/servicios/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  listArea?:Array<any>
  areaForm:FormGroup;

  constructor(
    private areaService:AreaService,
    private fb:FormBuilder
    ) {
      this.areaForm = this.fb.group({
        nombre:['',Validators.required],
        sigla:['',Validators.required]
      })
    }

  ngOnInit(): void {
    this.mostrarAreas();
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

  registrarAreas(){
    const formData = new FormData();
    formData.append('nombre', this.areaForm.get('nombre')?.value);
    formData.append('sigla', this.areaForm.get('sigla')?.value);

    this.areaService.postAreas(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarAreas();   
      }, (error)=>{
        console.log(error); 
      }
    )
  }

  cancelar(){
    this.areaForm.setValue({
      nombre:'',
      sigla:''
    })
  }

}
