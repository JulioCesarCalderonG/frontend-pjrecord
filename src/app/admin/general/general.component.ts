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
  generalEditarForm:FormGroup;
  ids?:string|number;
  tipofiltro:string='';
  datobuscar:string='';
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
    });
    this.generalEditarForm = this.fb.group({
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
    this.generalService.getGeneral(this.tipofiltro,this.datobuscar).subscribe(
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


  editarGeneral(){
    const formData = new FormData();

    formData.append('tipo_documento',this.generalEditarForm.get('tipodocumento')?.value);
    formData.append('numero',this.generalEditarForm.get('numero')?.value);
    formData.append('ano',this.generalEditarForm.get('ano')?.value);
    formData.append('tipo_sigla',this.generalEditarForm.get('tiposigla')?.value);
    formData.append('autoriza',this.generalEditarForm.get('autoriza')?.value);
    formData.append('tipo_dependencia',this.generalEditarForm.get('tipodependencia')?.value);
    formData.append('dependencia',this.generalEditarForm.get('dependencia')?.value);
    formData.append('id_cargo',this.generalEditarForm.get('cargo')?.value);
    formData.append('desde',this.generalEditarForm.get('desde')?.value);
    formData.append('hasta',this.generalEditarForm.get('hasta')?.value);
    formData.append('id_personal',this.generalEditarForm.get('personal')?.value);

    this.generalService.putGeneral(formData, this.ids!).subscribe(
      (data)=>{
        console.log(data);
        this.mostrarGeneral();
      }, (error)=>{
        console.log(error);
      }
    )
  }

  obtenerGeneralId(id:number){
    this.generalService.getGeneralId(id).subscribe(
      (data)=>{
        this.generalEditarForm.setValue({
          tipodocumento:data.resp.tipodocumento,
          numero:data.resp.numero,
          ano:data.resp.ano,
          tiposigla:data.resp.tiposigla,
          autoriza:data.resp.autoriza,
          tipodependencia:data.resp.tipodependencia,
          dependencia:data.resp.dependencia,
          cargo:data.resp.cargo,
          desde:data.resp.desde,
          hasta:data.resp.hasta,
          personal:data.resp.personal,
        })
        this.ids = data.resp.id;
      }, (error)=>{
        console.log(error);

      }
    )
  }
  filtrar(){
    if (this.tipofiltro !== '' && this.datobuscar !=='') {
      console.log(this.tipofiltro, this.datobuscar);
      this.mostrarGeneral();
    }
    if (this.tipofiltro==='0') {
      this.tipofiltro='';
      this.datobuscar='';
      this.mostrarGeneral();
    }

  }
  tipoFiltro(event:any){
    this.tipofiltro = event.target.value;
    console.log(this.tipofiltro);

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
    this.generalEditarForm.setValue({
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
