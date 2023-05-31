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
  administradorEditarForm:FormGroup;
  ids?:string|number;

  constructor(
    private administradorService:AdministradorService,
    private fb:FormBuilder
    ) {
      this.administradorForm = this.fb.group({
        usuario:['',Validators.required],
        password:['',Validators.required]
      });
      this.administradorEditarForm = this.fb.group({
        usuario:['',Validators.required],
        password:['',Validators.required]
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

    this.administradorService.postAdministrador(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarAdministrador();
        this.cancelar();
      }, (error)=>{
        console.log(error);
      }
    )
  }


  modificarAdministrador(){
    const formData = new FormData();
    formData.append('usuario', this.administradorEditarForm.get('usuario')?.value);
    formData.append('password', this.administradorEditarForm.get('password')?.value);
    this.administradorService.putAdministrador(formData,this.ids!).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarAdministrador();
      },(error)=>{
        console.log(error);   
      }
    )
  }
  

  obtenerAdministradorId(id:number){
    this.administradorService.getAdministradorId(id).subscribe(
      (data)=>{
        this.administradorEditarForm.setValue({
          usuario:data.resp.usuario,
          password:data.resp.password,
        })
        this.ids = data.resp.id;
      },(error)=>{
        console.log(error);

      }
    )
  }


  cancelar(){
    this.administradorForm.setValue({
      usuario:'',
      password:''
    });
    this.administradorEditarForm.setValue({
      usuario:'',
      password:''
    })
  }

}
