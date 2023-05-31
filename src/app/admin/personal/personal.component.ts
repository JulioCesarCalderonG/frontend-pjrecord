import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalService } from 'src/app/servicios/personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  listPersonal?:Array<any>
  personalForm:FormGroup;
  personalEditarForm:FormGroup;
  ids?:string|number;
  estado:string='1';

  constructor(
    private personalService:PersonalService,
    private fb:FormBuilder
    ) {
      this.personalForm = this.fb.group({
        nombre:['', Validators.required],
        apellido:['',Validators.required],
        escalafon:['',Validators.required],
        fecha_inicio:['',Validators.required]
      });
      this.personalEditarForm = this.fb.group({
        nombre:['', Validators.required],
        apellido:['',Validators.required],
        escalafon:['',Validators.required],
        fecha_inicio:['',Validators.required]
      })
    }

  ngOnInit(): void {
    this.mostrarPersonal();
  }

  mostrarPersonal(){
    this.personalService.getPersonal(this.estado).subscribe(
      (data)=>{
        this.listPersonal = data.resp;
      },(error)=>{
        console.log(error);       
      }
    )
  }

  registrarPersonal(){
    const formData = new FormData();
    formData.append('nombre', this.personalForm.get('nombre')?.value);
    formData.append('apellido', this.personalForm.get('apellido')?.value);
    formData.append('escalafon', this.personalForm.get('escalafon')?.value);
    formData.append('fecha_inicio', this.personalForm.get('fecha_inicio')?.value);

    this.personalService.postPersonal(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarPersonal();
        this.cancelar();
      }, (error)=>{
        console.log(error);
      }
    )
  }


  editarPersonal(){
    const formData = new FormData();
    formData.append('nombre', this.personalEditarForm.get('nombre')?.value);
    formData.append('apellido', this.personalEditarForm.get('apellido')?.value);
    formData.append('escalafon', this.personalEditarForm.get('escalafon')?.value);
    formData.append('fecha_inicio', this.personalEditarForm.get('fecha_inicio')?.value);

    this.personalService.putPersonal(formData, this.ids!).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarPersonal();
        
      }, (error)=>{
        console.log(error);
        
      }
    )

  }

  obtenerPersonalId(id:number){
    this.personalService.getPersonalId(id).subscribe(
      (data)=>{
        this.personalEditarForm.setValue({
          nombre:data.resp.nombre,
          apellido:data.resp.apellido,
          escalafon:data.resp.escalafon,
          fecha_inicio:data.resp.fecha_inicio,
        })
        this.ids = data.resp.id;
      }, (error)=>{
        console.log(error);
      }
    )
  }


  cancelar(){
    this.personalForm.setValue({
      nombre:'',
      apellido:'',
      escalafon:'',
      fecha_inicio:''
    })
    this.personalEditarForm.setValue({
      nombre:'',
      apellido:'',
      escalafon:'',
      fecha_inicio:''
    })
  }

}
