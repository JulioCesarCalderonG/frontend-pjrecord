import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/servicios/personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  listPersonal?:Array<any>

  constructor(private personalService:PersonalService) { }

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

}
