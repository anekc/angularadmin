import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando = true;

  constructor(private hospitalS: HospitalService) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalS.cargarHospitales().subscribe(hospitales =>  {
      this.cargando = false;
      this.hospitales = hospitales;
    } );
  }

}
