import { Component, OnInit } from '@angular/core';
import { TipodocumentoService } from 'src/app/servicios/tipodocumento.service';

@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.css']
})
export class TipodocumentoComponent implements OnInit {


  listTipodocumento?:Array<any>

  constructor(private tipodocumentoService:TipodocumentoService) { }

  ngOnInit(): void {
    this.mostrartipodocumento();
  }


  mostrartipodocumento(){
    this.tipodocumentoService.getTipodocumento().subscribe(
      (data)=>{
        this.listTipodocumento = data.resp;
      }, (error)=>{
        console.log(error);
        
      }
    )
  }

}
