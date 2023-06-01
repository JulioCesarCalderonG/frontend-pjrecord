import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoService } from 'src/app/servicios/cargo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

  listCargo?:Array<any>
  cargoForm:FormGroup;
  cargoEditarForm:FormGroup;
  ids?:string|number;
  estado:string='1';

  constructor(
    private cargoService:CargoService,
    private fb:FormBuilder
    ) {
      this.cargoForm = this.fb.group({
        descripcion:['',Validators.required]
      });
        this.cargoEditarForm = this.fb.group({
          descripcion:['',Validators.required]
        })
  }


  ngOnInit(): void {
    this.mostrarCargos();
  }


  mostrarCargos(){
    this.cargoService.getCargos(this.estado).subscribe(
      (data)=>{
        this.listCargo = data.resp;
      }, (error)=>{
        console.log(error);

      }
    )
  }

  registrarCargo(){
    const formData = new FormData();
    formData.append('descripcion',this.cargoForm.get('descripcion')?.value);

    this.cargoService.postCargos(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarCargos();
        this.cancelar();
      }, (error)=>{
        console.log(error);
      })
  }


  modificarCargo(){
    const formData = new FormData();
    formData.append('descripcion',this.cargoEditarForm.get('descripcion')?.value);
    this.cargoService.putCargo(formData,this.ids!).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarCargos();
      }, (error)=>{
        console.log(error);
        
      }
    )
  }

  eliminarCargo(id:number, estado:number){
    Swal.fire({
      title: 'Estas seguro?',
      text: (estado===1)?"El cargo sera habilitado":"El cargo sera deshabilitado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargoService.deleteCargo(id, estado).subscribe(
          (data)=>{
            this.mostrarCargos();
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
  
  
mostrarCargoTipo(event:any){
  console.log(event.target.value);
  this.estado = event.target.value;
  this.mostrarCargos();
}
  

  obtenerDatosId(id:number){
    this.cargoService.getCargoId(id).subscribe(
      (data)=>{
        console.log(data);
        
        this.cargoEditarForm.setValue({
          descripcion:data.resp.descripcion,
        })
        this.ids = data.resp.id;
      }, (error)=>{
        console.log(error);        
      }
    )
  }



  cancelar(){
    this.cargoForm.setValue({
      descripcion:''
    });
    this.cargoEditarForm.setValue({
      descripcion:''
    })
  }

}
