import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from 'src/app/servicios/administrador.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  listAdministrador?:Array<any>
  administradorForm:FormGroup;

  constructor(
    private administradorService:AdministradorService,
    private fb:FormBuilder
    ) {
      this.administradorForm = this.fb.group({
        usuario:['',Validators.required],
        password:['',Validators.required],
        activo:['',Validators.required]
      })
    }

  ngOnInit(): void {
    this.mostrarAdministrador();
  }

  mostrarAdministrador(){
    this.administradorService.getAdministrador().subscribe(
      (data)=>{
        this.listAdministrador = data.resp;
      }, (error)=>{
        console.log(error);
      }
    )
  }

  registrarAdministrador(){
    const formData = new FormData();
    formData.append('usuario', this.administradorForm.get('usuario')?.value);
    formData.append('password', this.administradorForm.get('password')?.value);
    formData.append('activo', this.administradorForm.get('activo')?.value);

    this.administradorService.postAdministrador(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarAdministrador();
      }, (error)=>{
        console.log(error);
      }
    )
  }

  cancelar(){
    this.administradorForm.setValue({
      usuario:'',
      password:'',
      activo:''
    })
  }

}
