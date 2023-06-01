import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resp, ResultOrgano } from 'src/app/interfaces/organo-interface';
import { ResultSede } from 'src/app/interfaces/sede-interface';
import { OrganoService } from 'src/app/servicios/organo.service';
import { SedeService } from 'src/app/servicios/sede.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organo',
  templateUrl: './organo.component.html',
  styleUrls: ['./organo.component.css']
})
export class OrganoComponent implements OnInit {

  listOrgano?:Resp[];
  listSedes?:Array<any>;
  organoForm:FormGroup;
  organoEditarForm:FormGroup;
  ids?:string|number;
  estado:string='1';


  constructor(
    private organoService:OrganoService,
    private sedeService:SedeService,
    private fb:FormBuilder,
  ) {
    this.organoForm = this.fb.group({
      nombre:['',Validators.required],
      sigla:['',Validators.required],
      sede:['',Validators.required]
    });
    this.organoEditarForm = this.fb.group({
      nombre:['',Validators.required],
      sigla:['',Validators.required],
      sede:['',Validators.required]
    })
  }


  ngOnInit(): void {
    this.mostrarOrgano();
    this.mostrarSede();
  }

  
  mostrarOrgano(){
    this.organoService.getOrgano(this.estado).subscribe(
      (data:ResultOrgano)=>{
        this.listOrgano = data.resp;
        console.log(this.listOrgano);
      },(error)=>{
        console.log(error);
      })
    }


  mostrarSede(){
    this.sedeService.getSedes().subscribe(
      (data:ResultSede)=>{
        this.listSedes = data.resp;
        console.log(this.listSedes);
      },
      (error)=>{
        console.log(error);
      })
  }


  registrarOrgano(){
    const formData = new FormData();
    formData.append('nombre',this.organoForm.get('nombre')?.value);
    formData.append('sigla',this.organoForm.get('sigla')?.value);
    formData.append('id_sede',this.organoForm.get('sede')?.value);
    this.organoService.postOrgano(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarOrgano();
        this.cancelar();
      },(error)=>{
        console.log(error);
      })
  }

  editarOrgano(){
    const formData = new FormData();
    formData.append('nombre', this.organoEditarForm.get('nombre')?.value);
    formData.append('sigla', this.organoEditarForm.get('sigla')?.value);
    formData.append('id_sede', this.organoEditarForm.get('sede')?.value);

    this.organoService.putOrgano(formData, this.ids!).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarOrgano();
      },(error)=>{
        console.log(error);
      }
    )
  }

  eliminarOrgano(id:number, estado:number){
    Swal.fire({
      title: 'Estas seguro?',
      text: (estado===1)?"El Organo sera habilitado":"El Organo sera deshabilitado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.organoService.deleteOrgano(id, estado).subscribe(
          (data)=>{
            this.mostrarOrgano();
            Swal.fire(
              (estado===1)?'Habilitado':'Deshabilitado',
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


  mostrarOrganoTipo(event:any){
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrarOrgano();
  }



  obtenerOrganoId(id:number){
    this.organoService.getOrganoId(id).subscribe(
      (data)=>{
        this.organoEditarForm.setValue({
          nombre:data.resp.nombre,
          sigla:data.resp.sigla,
          sede:data.resp.id_sede,
        })
        this.ids = data.resp.id;
      }, (error)=>{
        console.log(error);
      }
    )
  }

  
  cancelar(){
    this.organoForm.setValue({
      nombre:'',
      sigla:'',
      sede:''
    })
    this.organoEditarForm.setValue({
      nombre:'',
      sigla:'',
      sede:''
    })
  }
}
