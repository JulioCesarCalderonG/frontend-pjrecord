import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/servicios/general.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  listGeneral?:Array<any>

  constructor(private generalService:GeneralService) { }

  ngOnInit(): void {
    this.mostrarGeneral();
  }

  mostrarGeneral(){
    this.generalService.getGeneral().subscribe(
      (data)=>{
        this.listGeneral = data.resp;
      }, (error)=>{
        console.log(error);
      }
    )
  }
}
