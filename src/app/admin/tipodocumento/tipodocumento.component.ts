import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipodocumentoService } from 'src/app/servicios/tipodocumento.service';

@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.css']
})
export class TipodocumentoComponent implements OnInit {


  listTipodocumento?:Array<any>
  tipodocumentoform:FormGroup;

  constructor(
    private tipodocumentoService:TipodocumentoService,
    private fb:FormBuilder
    ) {
      this.tipodocumentoform = this.fb.group({
        descripcion:['',Validators.required]
      })
    }

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

  registrarTipodocumento(){
    const formData = new FormData();
    formData.append('descripcion', this.tipodocumentoform.get('descripcion')?.value)
   
    this.tipodocumentoService.postTipodocumento(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrartipodocumento();
      }, (error)=>{
        console.log(error);     
      }
    )
  }

  cancelar(){
    this.tipodocumentoform.setValue({
      descripcion:''
    })
  }

}
