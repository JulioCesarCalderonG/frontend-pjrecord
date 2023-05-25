import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/servicios/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  listArea?:Array<any>

  constructor(private areaService:AreaService) { }

  ngOnInit(): void {
    this.mostrarAreas();
  }

  mostrarAreas(){
    this.areaService.getAreas().subscribe(
      (data)=>{
        this.listArea = data.resp;

      },(error)=>{
        console.log(error);

      }
    )
  }
}
