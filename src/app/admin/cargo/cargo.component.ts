import { Component, OnInit } from '@angular/core';
import { CargoService } from 'src/app/servicios/cargo.service';


@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

  listCargo?:Array<any>

  constructor(private cargoService:CargoService) { }

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

}
