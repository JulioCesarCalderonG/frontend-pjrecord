import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import Swal from 'sweetalert2';

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
  activo:string="1";


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
    this.administradorService.getAdministrador(this.activo).subscribe(
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
  

  eliminarAdministrador(id:number, activo:number){
    Swal.fire({
      title: 'Estas seguro?',
      text: (activo===1)?'El administrador sera habilitado':'El administrador sera deshabilitado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradorService.deleteAdministrador(id,activo).subscribe(
          (data)=>{
            this.mostrarAdministrador();
            Swal.fire(
              (activo===1)?'Habilitado':'Deshabilitado',
              'Correcto',
              'success'
            )
          }, (error)=>{
            console.log(error);
          }
        )
        
      }
    })
  }


  mostrarAdminTipo(event:any){
    console.log(event.target.value);
    this.activo = event.target.value;
    this.mostrarAdministrador();
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
