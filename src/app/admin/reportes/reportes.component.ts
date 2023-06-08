import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  personal='';
  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.rutaActiva.snapshot.params.id);
    this.personal = this.rutaActiva.snapshot.params.personal;
  }




}
