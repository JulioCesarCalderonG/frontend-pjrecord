import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoService } from 'src/app/servicios/cargo.service';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

  listCargo?:Array<any>
  cargoForm:FormGroup;

  constructor(
    private cargoService:CargoService,
    private fb:FormBuilder
    ) {
      this.cargoForm = this.fb.group({
        descripcion:['',Validators.required]
      })
    }

  ngOnInit(): void {
    this.mostrarCargos();
  }

  mostrarCargos(){
    this.cargoService.getCargos().subscribe(
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

      }
    )
  }

  cancelar(){
    this.cargoForm.setValue({
      descripcion:''
    })
  }

}
