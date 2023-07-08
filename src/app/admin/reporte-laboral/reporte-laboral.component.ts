import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from 'src/app/servicios/area.service';
import { CargoService } from 'src/app/servicios/cargo.service';
import { DependenciaService } from 'src/app/servicios/dependencia.service';
import { GeneralService } from 'src/app/servicios/general.service';
import { OrganoService } from 'src/app/servicios/organo.service';
import { RegimenLaboralService } from 'src/app/servicios/regimen-laboral.service';
import { ReporteService } from 'src/app/servicios/reporte.service';
import { TipoLicenciaService } from 'src/app/servicios/tipo-licencia.service';
import { TipoPersonalService } from 'src/app/servicios/tipo-personal.service';
import { TipodocumentoService } from 'src/app/servicios/tipodocumento.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-laboral',
  templateUrl: './reporte-laboral.component.html',
  styleUrls: ['./reporte-laboral.component.css'],
})
export class ReporteLaboralComponent implements OnInit {
  idpersonal?: string | number;
  personal = '';
  listRecord?: Array<any>;
  listCargo?: Array<any>;
  listAutoriza?: Array<any>;
  listTipoLicencia?: Array<any>;
  listTipoPersonal?: Array<any>;
  generalForm: FormGroup;
  recordEditarForm: FormGroup;
  regimenForm: FormGroup;
  listDependencia?: Array<any>;
  listTipodocumento?: Array<any>;
  listRegimenLaboral?: Array<any>;
  idrecord: string = '';
  loadImage: string = '';
  loadDocumentoImage: string = '';
  idDocumentoLaboral: string = '';
  carga: boolean = false;
  url3 = `${environment.backendUrl}/reporte`;
  url = `${environment.backendUrl}/uploadgeneral/recordlaboral`;
  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef;
  @ViewChild('fileDocumentoLaboral', { static: false })
  fileDocumentoLaboral?: ElementRef;
  uploadFiles?: File;
  uploadDocumentoLaboral?: File;
  constructor(
    private rutaActiva: ActivatedRoute,
    private reporteService: ReporteService,
    private generalService: GeneralService,
    private cargoService: CargoService,
    private organoService: OrganoService,
    private unidadService: DependenciaService,
    private areaService: AreaService,
    private tipoLicenciaService: TipoLicenciaService,
    private tipoPersonalServicie: TipoPersonalService,
    private tipodocumentoService: TipodocumentoService,
    private regimenService: RegimenLaboralService,
    private fb: FormBuilder
  ) {
    this.generalForm = this.fb.group({
      periodo: ['', Validators.required],
      tipodocumento: ['', Validators.required],
      numero: [''],
      ano: [''],
      tiposigla: ['0'],
      autoriza: ['0'],
      tipodependencia: ['', Validators.required],
      dependencia: ['', Validators.required],
      cargo: ['', Validators.required],
      desde: ['', Validators.required],
      hasta: [''],
    });
    this.recordEditarForm = this.fb.group({
      periodo: ['', Validators.required],
      tipodocumento: ['', Validators.required],
      numero: [''],
      ano: [''],
      tiposigla: ['0'],
      autoriza: ['0'],
      tipodependencia: ['', Validators.required],
      dependencia: ['', Validators.required],
      cargo: ['', Validators.required],
      desde: ['', Validators.required],
      hasta: [''],
      tipo_personal: [''],
    });
    this.regimenForm = this.fb.group({
      regimen: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.idpersonal = this.rutaActiva.snapshot.params.id;
    this.personal = this.rutaActiva.snapshot.params.personal;
    this.mostrarTablas();
    this.mostrartipodocumento();
    this.mostrarTipoPersonal();
    this.mostrarRegimenLaboral();
  }

  mostrarTablas() {
    this.carga = true;
    if (this.carga) {
      Swal.fire({
        title: 'Cargando datos!',
        html: 'Por favor espere.',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    this.generalService.getGeneralPersonal(`${this.idpersonal}`).subscribe(
      (data) => {
        this.listRecord = data.resp;
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
        console.log(data);
      },
      (error) => {
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
        console.log(error);
      }
    );
  }
  mostrarRegimenLaboral() {
    this.regimenService.getRegimenPersonalId(this.idpersonal!).subscribe(
      (data) => {
        this.listRegimenLaboral = data.resp;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  generarReporte() {
    this.carga = true;
    if (this.carga) {
      Swal.fire({
        title: 'Generando reporte!',
        html: 'Por favor espere',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    this.reporteService.postReporteRecordId(`${this.idpersonal}`).subscribe(
      (data) => {
        const urlreport = `${this.url3}/recordlaboral/${data.nombre}`;
        window.open(urlreport, '_blank');
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
      },
      (error) => {
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
        console.log(error);
      }
    );
  }

  registrarGeneral() {
    const formData = new FormData();
    formData.append(
      'tipo_documento',
      this.generalForm.get('tipodocumento')?.value
    );
    formData.append('periodo', this.generalForm.get('periodo')?.value);
    formData.append('numero', this.generalForm.get('numero')?.value);
    formData.append('ano', this.generalForm.get('ano')?.value);
    formData.append('tipo_sigla', this.generalForm.get('tiposigla')?.value);
    formData.append('autoriza', this.generalForm.get('autoriza')?.value);
    formData.append('tipo_dependencia',this.generalForm.get('tipodependencia')?.value);
    formData.append('dependencia', this.generalForm.get('dependencia')?.value);
    formData.append('id_cargo', this.generalForm.get('cargo')?.value);
    formData.append('desde', this.generalForm.get('desde')?.value);
    formData.append('hasta', this.generalForm.get('hasta')?.value);
    formData.append('id_personal', `${this.idpersonal}`);
    formData.append('personal',`${this.personal}`);
    formData.append('archivo', this.fileInput?.nativeElement.files[0]);
    this.generalService.postGeneral(formData).subscribe(
        (data) => {
          Swal.fire('Registrado!', data.msg, 'success');
          this.cancelaruno();
          this.reset();
          this.mostrarTablas();
        },
        (error) => {
          console.log(error);
         Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Seleccione el documento que autoriza',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );

  }
  actualizarGeneral() {
    const formData = new FormData();
    formData.append(
      'tipo_documento',
      this.recordEditarForm.get('tipodocumento')?.value
    );
    formData.append('periodo', this.recordEditarForm.get('periodo')?.value);
    formData.append('numero', this.recordEditarForm.get('numero')?.value);
    formData.append('ano', this.recordEditarForm.get('ano')?.value);
    formData.append(
      'tipo_sigla',
      this.recordEditarForm.get('tiposigla')?.value
    );
    formData.append('autoriza', this.recordEditarForm.get('autoriza')?.value);
    formData.append(
      'tipo_dependencia',
      this.recordEditarForm.get('tipodependencia')?.value
    );
    formData.append(
      'dependencia',
      this.recordEditarForm.get('dependencia')?.value
    );
    formData.append('id_cargo', this.recordEditarForm.get('cargo')?.value);
    formData.append('desde', this.recordEditarForm.get('desde')?.value);
    formData.append('hasta', this.recordEditarForm.get('hasta')?.value);
    formData.append('id_personal', `${this.idpersonal}`);

    this.generalService.putGeneral(formData, this.idrecord).subscribe(
      (data) => {
        Swal.fire('Editado!', data.msg, 'success');
        this.mostrarTablas();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  editarDocumentoLaboral() {
    if (this.loadDocumentoImage === '') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Falta seleccionar el documento actualizar',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const formData = new FormData();
      formData.append(
        'archivo',
        this.fileDocumentoLaboral?.nativeElement.files[0]
      );
      this.generalService
        .putDocumentoLaboral(formData, this.idDocumentoLaboral)
        .subscribe(
          (data) => {
            Swal.fire('Registrado!', data.msg, 'success');
            this.mostrarTablas();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  eliminarRecord(id: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Este registro sera eliminado de la base de datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalService.deleteGeneral(id).subscribe(
          (data) => {
            Swal.fire(
              'Eliminar!',
              'Registro eliminado de la base de datos.',
              'success'
            );
            this.mostrarTablas();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  obtenerIdDocumentoLaboral(id: number) {
    this.idDocumentoLaboral = `${id}`;
  }

  obtenerDatosRecordId(id: number) {
    console.log(id);
    this.idrecord = `${id}`;
    this.generalService.getGeneralId(id).subscribe(
      (data) => {
        console.log(data);
        this.recordEditarForm.setValue({
          periodo: data.resp.periodo,
          tipodocumento: `${data.resp.tipo_documento}`,
          numero: data.resp.numero,
          ano: data.resp.ano,
          tiposigla: `${data.resp.tipo_sigla}`,
          autoriza: `${data.resp.id_area}`,
          tipodependencia: `${data.resp.tipo_dependencia}`,
          dependencia: `${data.resp.id_dependencia}`,
          cargo: `${data.resp.id_cargo}`,
          desde: data.resp.inicio,
          hasta: data.resp.fin === '2030-12-30' ? '' : data.resp.fin,
          tipo_personal: data.resp.Cargo.TipoPersonal.id,
        });
        this.buscarSiglaDos(`${data.resp.tipo_sigla}`);
        this.buscarDependenciaDos(`${data.resp.tipo_dependencia}`);
        this.filtrarTipoPersonalDos(`${data.resp.Cargo.TipoPersonal.id}`);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mostrartipodocumento() {
    this.tipodocumentoService.getTipodocumento().subscribe(
      (data) => {
        this.listTipodocumento = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mostrarTipoPersonal() {
    this.tipoPersonalServicie.getTipoPersonal('1').subscribe(
      (data) => {
        this.listTipoPersonal = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mostrarTipoLicencia() {
    this.tipoLicenciaService.getTipoLicencia().subscribe(
      (data) => {
        this.listTipoLicencia = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  buscarSigla(event: any) {
    switch (event.target.value) {
      case '1':
        this.organoService.getOrgano().subscribe(
          (data) => {
            console.log(data);
            this.listAutoriza = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '2':
        this.unidadService.getUnidad().subscribe(
          (data) => {
            console.log(data);
            this.listAutoriza = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '3':
        this.areaService.getAreas().subscribe(
          (data) => {
            console.log(data);
            this.listAutoriza = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      default:
        this.listAutoriza = [];
        return;
    }
  }
  buscarSiglaDos(id: string) {
    switch (id) {
      case '1':
        this.organoService.getOrgano().subscribe(
          (data) => {
            console.log(data);
            this.listAutoriza = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '2':
        this.unidadService.getUnidad().subscribe(
          (data) => {
            console.log(data);
            this.listAutoriza = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '3':
        this.areaService.getAreas().subscribe(
          (data) => {
            console.log(data);
            this.listAutoriza = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      default:
        this.listAutoriza = [];
        return;
    }
  }
  buscarDependencia(event: any) {
    switch (event.target.value) {
      case '1':
        this.organoService.getOrgano().subscribe(
          (data) => {
            console.log(data);
            this.listDependencia = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '2':
        this.unidadService.getUnidad().subscribe(
          (data) => {
            console.log(data);
            this.listDependencia = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '3':
        this.areaService.getAreas().subscribe(
          (data) => {
            console.log(data);
            this.listDependencia = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      default:
        this.listDependencia = [];
        return;
    }
  }
  buscarDependenciaDos(id: string) {
    switch (id) {
      case '1':
        this.organoService.getOrgano().subscribe(
          (data) => {
            console.log(data);
            this.listDependencia = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '2':
        this.unidadService.getUnidad().subscribe(
          (data) => {
            console.log(data);
            this.listDependencia = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '3':
        this.areaService.getAreas().subscribe(
          (data) => {
            console.log(data);
            this.listDependencia = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      default:
        this.listDependencia = [];
        return;
    }
  }
  filtrarTipoPersonal(event: any) {
    const tipo = event.target.value;
    if (!tipo) {
      this.cargoService.getCargoPersonal(0).subscribe(
        (data) => {
          this.listCargo = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.cargoService.getCargoPersonal(tipo).subscribe(
        (data) => {
          this.listCargo = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  filtrarTipoPersonalDos(id: string) {
    const tipo = id;
    if (!tipo) {
      this.cargoService.getCargoPersonal(0).subscribe(
        (data) => {
          this.listCargo = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.cargoService.getCargoPersonal(tipo).subscribe(
        (data) => {
          this.listCargo = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
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
        timer: 1500,
      });
      this.reset();
      this.loadImage = '';
    } else {
      this.loadImage = 'cargado';
    }
  }
  capturarDocumentoLaboral(event: any) {
    this.uploadFiles = event.target.files[0];
    if (this.uploadFiles!.size > 2500000) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El tamaño maximo es de 20MB',
        showConfirmButton: false,
        timer: 1500,
      });
      this.reset();
      this.loadDocumentoImage = '';
    } else {
      this.loadDocumentoImage = 'cargado';
    }
  }
  /* Funciones Secundarias */
  reset() {
    this.fileInput!.nativeElement.value = '';
    this.fileDocumentoLaboral!.nativeElement.value = '';
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
  cancelaruno() {
    this.generalForm.setValue({
      periodo: '',
      tipodocumento: '',
      numero: '',
      ano: '',
      tiposigla: '0',
      autoriza: '0',
      tipodependencia: '',
      dependencia: '',
      cargo: '',
      desde: '',
      hasta: '',
    });
    this.recordEditarForm.setValue({
      periodo: '',
      tipodocumento: '',
      numero: '',
      ano: '',
      tiposigla: '0',
      autoriza: '0',
      tipodependencia: '',
      dependencia: '',
      cargo: '',
      desde: '',
      hasta: '',
      tipo_personal: '',
    });
    this.loadImage = '';
    this.reset();
    this.loadDocumentoImage = '';
  }
}
