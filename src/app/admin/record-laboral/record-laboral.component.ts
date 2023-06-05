import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaService } from 'src/app/servicios/area.service';
import { CargoService } from 'src/app/servicios/cargo.service';
import { DependenciaService } from 'src/app/servicios/dependencia.service';
import { GeneralService } from 'src/app/servicios/general.service';
import { OrganoService } from 'src/app/servicios/organo.service';
import { PersonalService } from 'src/app/servicios/personal.service';
import { TipoPersonalService } from 'src/app/servicios/tipo-personal.service';
import { TipodocumentoService } from 'src/app/servicios/tipodocumento.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-record-laboral',
  templateUrl: './record-laboral.component.html',
  styleUrls: ['./record-laboral.component.css']
})
export class RecordLaboralComponent implements OnInit {
  generalForm:FormGroup;
  listTipodocumento?:Array<any>;
  listCargo?:Array<any>;
  listPersonal?:Array<any>
  listAutoriza?:Array<any>;
  listDependencia?:Array<any>;
  listTipoPersonal?:Array<any>;
  generalEditarForm:FormGroup;
  ids?:string|number;
  tipofiltro:string='';
  datobuscar:string='';
  loadImage: string='';

  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef;
  uploadFiles?: File;
  constructor(
    private generalService:GeneralService,
    private tipodocumentoService:TipodocumentoService,
    private tipoPersonalServicie:TipoPersonalService,
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
    this.mostrartipodocumento();
    this.mostrarPersonal();
    this.mostrarTipoPersonal();
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
    if (this.loadImage==='') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Seleccione el documento que autoriza',
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      formData.append('archivo',this.fileInput?.nativeElement.files[0]);
      this.generalService.postGeneral(formData).subscribe(
        (data)=>{
          Swal.fire(
            'Registrado!',
            data.msg,
            'success'
          )
          this.cancelar();
          this.reset();
        },(error)=>{
          console.log(error);

        }
      )
    }

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
  mostrarPersonal(){
    this.personalService.getPersonal().subscribe(
      (data)=>{
        this.listPersonal = data.resp;
      },(error)=>{
        console.log(error);
      }
    )
  }
  mostrarTipoPersonal(){
    this.tipoPersonalServicie.getTipoPersonal('1').subscribe(
      (data)=>{
        this.listTipoPersonal = data.resp;
      },(error)=>{
        console.log(error);

      }
    )
  }
  filtrarTipoPersonal(event:any){
    const tipo =event.target.value;
    if (!tipo) {
      this.cargoService.getCargoPersonal(0).subscribe(
        (data)=>{
          this.listCargo = data.resp;
        },(error)=>{
          console.log(error);

        }
      )
    }else{
      this.cargoService.getCargoPersonal(tipo).subscribe(
        (data)=>{
          this.listCargo = data.resp;
        },(error)=>{
          console.log(error);

        }
      )
    }

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
  tipoFiltro(event:any){
    this.tipofiltro = event.target.value;
    console.log(this.tipofiltro);
  }
  capturarFile(event: any) {
    this.uploadFiles = event.target.files[0];

    if (this.uploadFiles!.size > 2500000) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El tamaño maximo es de 20MB',
        showConfirmButton: false,
        timer: 1500
      });
      this.reset();
      this.loadImage = '';
    }else{
      this.loadImage='cargado';
    }

  }
  reset() {
    this.fileInput!.nativeElement.value = '';
  }
  extraserBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        /* const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg); */
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        reject(e);
      }
    });
  cancelar(){
    this.generalForm.setValue({
      tipodocumento:'',
      numero:'',
      ano:'',
      tiposigla:'0',
      autoriza:'0',
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
