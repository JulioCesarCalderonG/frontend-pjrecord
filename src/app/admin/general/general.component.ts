import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaService } from 'src/app/servicios/area.service';
import { CargoService } from 'src/app/servicios/cargo.service';
import { DependenciaService } from 'src/app/servicios/dependencia.service';
import { GeneralService } from 'src/app/servicios/general.service';
import { OrganoService } from 'src/app/servicios/organo.service';
import { PersonalService } from 'src/app/servicios/personal.service';
import { TipodocumentoService } from 'src/app/servicios/tipodocumento.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  listGeneral?:Array<any>;
  generalForm:FormGroup;
  listTipodocumento?:Array<any>;
  listCargo?:Array<any>;
  listPersonal?:Array<any>
  listAutoriza?:Array<any>;
  listDependencia?:Array<any>;
  constructor(
    private generalService:GeneralService,
    private tipodocumentoService:TipodocumentoService,
    private cargoService:CargoService,
    private organoService:OrganoService,
    private unidadService:DependenciaService,
    private areaService:AreaService,
    private personalService:PersonalService,
    private fb:FormBuilder
  ) {
    this.generalForm = this.fb.group({
      tipodocumento:['',Validators.required],
      numero:[''],
      ano:[''],
      tiposigla:['0'],
      autoriza:['0'],
      tipodependencia:['',Validators.required],
      dependencia:['',Validators.required],
      cargo:['',Validators.required],
      desde:['', Validators.required],
      hasta:[''],
      personal:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarGeneral();
    this.mostrartipodocumento();
    this.mostrarCargos();
    this.mostrarPersonal();
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


  registrarGeneral(){
    const formData = new FormData();
    formData.append('tipo_documento',this.generalForm.get('tipodocumento')?.value);
    formData.append('numero',this.generalForm.get('numero')?.value);
    formData.append('ano',this.generalForm.get('ano')?.value);
    formData.append('tipo_sigla',this.generalForm.get('tiposigla')?.value);
    formData.append('autoriza',this.generalForm.get('autoriza')?.value);
    formData.append('tipo_dependencia',this.generalForm.get('tipodependencia')?.value);
    formData.append('dependencia',this.generalForm.get('dependencia')?.value);
    formData.append('id_cargo',this.generalForm.get('cargo')?.value);
    formData.append('desde',this.generalForm.get('desde')?.value);
    formData.append('hasta',this.generalForm.get('hasta')?.value);
    formData.append('id_personal',this.generalForm.get('personal')?.value);
    this.generalService.postGeneral(formData).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarGeneral();
        this.cancelar();
      },(error)=>{
        console.log(error);

      }
    )
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
  mostrarCargos(){
    this.cargoService.getCargos().subscribe(
      (data)=>{
        this.listCargo = data.resp;

      }, (error)=>{
        console.log(error);

      }
    )
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

  buscarSigla(event:any){
    switch (event.target.value) {
      case '1':
          this.organoService.getOrgano().subscribe(
            (data)=>{
              console.log(data);
              this.listAutoriza = data.resp;
            },(error)=>{
              console.log(error);
            }
          );
          return;
      case '2':
        this.unidadService.getUnidad().subscribe(
          (data)=>{
            console.log(data);
            this.listAutoriza = data.resp;
          },(error)=>{
            console.log(error);
          }
        );
        return;
      case '3':
        this.areaService.getAreas().subscribe(
          (data)=>{
            console.log(data);
            this.listAutoriza = data.resp;
          },(error)=>{
            console.log(error);
          }
        );
        return;
      default:
        this.listAutoriza=[]
        return;
    }
  }
  buscarDependencia(event:any){
    switch (event.target.value) {
      case '1':
          this.organoService.getOrgano().subscribe(
            (data)=>{
              console.log(data);
              this.listDependencia = data.resp;
            },(error)=>{
              console.log(error);
            }
          );
          return;
      case '2':
        this.unidadService.getUnidad().subscribe(
          (data)=>{
            console.log(data);
            this.listDependencia = data.resp;
          },(error)=>{
            console.log(error);
          }
        );
        return;
      case '3':
        this.areaService.getAreas().subscribe(
          (data)=>{
            console.log(data);
            this.listDependencia = data.resp;
          },(error)=>{
            console.log(error);
          }
        );
        return;
      default:
        this.listDependencia=[]
        return;
    }
  }


  cancelar(){
    this.generalForm.setValue({
      tipodocumento:'',
      numero:'',
      ano:'',
      tiposigla:'',
      autoriza:'',
      tipodependencia:'',
      dependencia:'',
      cargo:'',
      desde:'',
      hasta:'',
      personal:''
    })
  }

}
