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

  constructor(
    private personalService:PersonalService,
    private fb:FormBuilder
    ) {
      this.personalForm = this.fb.group({
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
    this.personalService.getPersonal().subscribe(
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

  cancelar(){
    this.personalForm.setValue({
      nombre:'',
      apellido:'',
      escalafon:'',
      fecha_inicio:''
    })
  }

}
