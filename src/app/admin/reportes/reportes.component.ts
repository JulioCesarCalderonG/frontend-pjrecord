import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AreaService } from 'src/app/servicios/area.service';
import { CargoService } from 'src/app/servicios/cargo.service';
import { DependenciaService } from 'src/app/servicios/dependencia.service';
import { DetalleLicenciaService } from 'src/app/servicios/detalle-licencia.service';
import { GeneralService } from 'src/app/servicios/general.service';
import { LicenciaService } from 'src/app/servicios/licencia.service';
import { OrganoService } from 'src/app/servicios/organo.service';
import { TipoLicenciaService } from 'src/app/servicios/tipo-licencia.service';
import { TipoPersonalService } from 'src/app/servicios/tipo-personal.service';
import { TipodocumentoService } from 'src/app/servicios/tipodocumento.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  idpersonal?:string|number;
  personal='';
  listLicencia?:Array<any>;
  listRecord?:Array<any>;
  listTipodocumento?:Array<any>;
  listCargo?:Array<any>;
  listAutoriza?:Array<any>;
  listDependencia?:Array<any>;
  listTipoPersonal?:Array<any>;
  listTipoLicencia?:Array<any>;
  listDetalleLicencia?:Array<any>;
  generalForm:FormGroup;
  licenciaForm:FormGroup;
  loadImage: string='';
  loadLicencia: string='';
  opcionFiltro:string='';
  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef;
  @ViewChild('fileLicencia', { static: false }) fileLicencia?: ElementRef;
  url = `${environment.backendUrl}/uploadgeneral/recordlaboral`;
  url2 = `${environment.backendUrl}/uploadgeneral/licencia`;
  uploadFiles?: File;
  uploadLicencia?: File;
  constructor(
    private rutaActiva: ActivatedRoute,
    private generalService:GeneralService,
    private tipodocumentoService:TipodocumentoService,
    private tipoPersonalServicie:TipoPersonalService,
    private cargoService:CargoService,
    private organoService:OrganoService,
    private unidadService:DependenciaService,
    private areaService:AreaService,
    private tipoLicenciaService:TipoLicenciaService,
    private detalleLicenciaService:DetalleLicenciaService,
    private licenciaService:LicenciaService,
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
      hasta:['']
    });
    this.licenciaForm = this.fb.group({
      tipodocumento:['',Validators.required],
      area:[''],
      numero:[Number, Validators.required],
      ano:[Number,Validators.required],
      inicio:['',Validators.required],
      fin:['',Validators.required],
      detallelicencia:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.idpersonal= this.rutaActiva.snapshot.params.id;
    this.personal = this.rutaActiva.snapshot.params.personal;
    this.mostrartipodocumento();
    this.mostrarTipoPersonal();
    this.mostrarTipoLicencia();
  }

  /* Mostrar Tablas */

  mostrarTablas(){
    if (this.opcionFiltro === '1') {
      document.getElementById('tableRecord')?.classList.remove('invi');
      document.getElementById('tableLicencia')?.classList.add('invi');
      this.generalService.getGeneralPersonal(`${this.idpersonal}`).subscribe(
        (data)=>{
          console.log(data);
          this.listRecord = data.resp;
        },(error)=>{
          console.log(error);

        }
      )
    }else if (this.opcionFiltro === '2') {
      document.getElementById('tableRecord')?.classList.add('invi');
      document.getElementById('tableLicencia')?.classList.add('invi');
    }else if (this.opcionFiltro === '3') {
      document.getElementById('tableRecord')?.classList.add('invi');
      document.getElementById('tableLicencia')?.classList.remove('invi');
      this.licenciaService.getLicenciaPersonal(`${this.idpersonal}`).subscribe(
        (data)=>{
          console.log(data);
          this.listLicencia = data.resp;
        },(error)=>{
          console.log(error);

        }
      )
    }else if (this.opcionFiltro === '4') {
      document.getElementById('tableRecord')?.classList.add('invi');
      document.getElementById('tableLicencia')?.classList.add('invi');
    }
    else{
      document.getElementById('tableRecord')?.classList.add('invi');
      document.getElementById('tableLicencia')?.classList.add('invi');
    }
  }

  filtrarOpcion(event:any){
    const valor = event.target.value;
    this.opcionFiltro = valor;
    console.log(valor);

  }

  /* Registro de Record Laboral */
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
    formData.append('id_personal',`${this.idpersonal}`);
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
  mostrarTipoPersonal(){
    this.tipoPersonalServicie.getTipoPersonal('1').subscribe(
      (data)=>{
        this.listTipoPersonal = data.resp;
      },(error)=>{
        console.log(error);

      }
    )
  }
  mostrarTipoLicencia(){
    this.tipoLicenciaService.getTipoLicencia().subscribe(
      (data)=>{
        this.listTipoLicencia=data.resp;
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

  /*  Seccion Crear Licencias */
  registrarLicencia(){
    const tipo = this.licenciaForm.get('tipodocumento')?.value;
    const formData = new FormData();
    if (tipo==='1') {
      formData.append('tipo_documento',this.licenciaForm.get('tipodocumento')?.value);
      formData.append('area',this.licenciaForm.get('area')?.value);
      formData.append('numero',this.licenciaForm.get('numero')?.value);
      formData.append('ano',this.licenciaForm.get('ano')?.value);
      formData.append('id_personal',`${this.idpersonal}`);
      formData.append('id_detalle_licencia',this.licenciaForm.get('detallelicencia')?.value);
      formData.append('inicio',this.licenciaForm.get('inicio')?.value);
      formData.append('fin',this.licenciaForm.get('fin')?.value);
    }
    if (tipo==='2') {
      formData.append('tipo_documento',this.licenciaForm.get('tipodocumento')?.value);
      formData.append('area','');
      formData.append('numero',this.licenciaForm.get('numero')?.value);
      formData.append('ano',this.licenciaForm.get('ano')?.value);
      formData.append('id_personal',`${this.idpersonal}`);
      formData.append('id_detalle_licencia',this.licenciaForm.get('detallelicencia')?.value);
      formData.append('inicio',this.licenciaForm.get('inicio')?.value);
      formData.append('fin',this.licenciaForm.get('fin')?.value);
    }
    if (this.loadLicencia==='') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Seleccione el documento que autoriza',
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      formData.append('archivo',this.fileLicencia?.nativeElement.files[0]);
      this.licenciaService.postLicencia(formData).subscribe(
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
  mostrarProveido(event:any){
    const valor = event.target.value;
    console.log(valor);
    if (valor === '1') {
      document.getElementById('selectArea')?.classList.remove('invi');
    }
    else{
      document.getElementById('selectArea')?.classList.add('invi');
    }
  }
  mostrarDetalleLicencia(event:any){
    const valor = event.target.value;
      if (valor!=="") {
        this.detalleLicenciaService.getDetalleTipo(valor).subscribe(
          (data)=>{
            this.listDetalleLicencia=data.resp
          },(error)=>{
            console.log(error);
          }
        )
      }else{
        this.detalleLicenciaService.getDetalleTipo('0').subscribe(
          (data)=>{
            this.listDetalleLicencia=data.resp
          },(error)=>{
            console.log(error);
          }
        )
      }
  }
  capturarFileLicencia(event: any) {
    this.uploadLicencia = event.target.files[0];

    if (this.uploadLicencia!.size > 2500000) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El tamaño maximo es de 20MB',
        showConfirmButton: false,
        timer: 1500
      });
      this.reset();
      this.loadLicencia = '';
    }else{
      this.loadLicencia='cargado';
    }

  }


  reset() {
    this.fileInput!.nativeElement.value = '';
    this.fileLicencia!.nativeElement.value = '';
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
        hasta:''
      });
      this.licenciaForm.setValue({
        tipodocumento:'',
        area:'',
        numero:'',
        ano:'',
        inicio:'',
        fin:'',
        detallelicencia:''
      })
      this.reset();
    }
}
