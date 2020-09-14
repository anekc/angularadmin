import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {
  public imgSubs: Subscription;
  public hospitales: Hospital[] = [];
  public hospitalTemp: Hospital[] = [];
  public cargando = true;

  constructor(private hospitalS: HospitalService,
              private modalIMagenService: ModalImagenService,
              private busqueda: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalIMagenService.nuevaIMagen.pipe(delay(100)).subscribe( img => this.cargarHospitales());
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalS.cargarHospitales().subscribe(hospitales =>  {
      this.cargando = false;
      this.hospitales = hospitales;
    } );
  }
  guardarCambios(hospital: Hospital){
    this.hospitalS.actualizarHospital( hospital._id , hospital.nombre)
    .subscribe(resp => {
      Swal.fire(
        'Actualizado',
        hospital.nombre,
        'success'
      );
    });

  }

  eliminarHospital(hospital: Hospital){
    this.hospitalS.borrarHospital(hospital._id)
    .subscribe(resp => {
      this.cargarHospitales();
      Swal.fire(
      'Eliminado',
      hospital.nombre,
      'success');
    });
  }

 async  abrirSweetAlert(){
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalS.crearHospital(value)
      .subscribe((resp: any) => {
        // this.hospitales.push(resp.hospital)
    this.cargarHospitales();
      });
    }
  }

  abrirModal(hospital: Hospital){
    console.log(hospital);
    this.modalIMagenService.abrirModal('hospitales', hospital._id, hospital.img);

  }

  buscarHospital(termino: string){
    if (termino.length === 0){
     return this.hospitales = this.hospitalTemp;
    }
    console.log(termino);
    this.busqueda.buscar('hospitales', termino)
    .subscribe((resp: Hospital[]) => {
      this.hospitales = resp;
    });
  }
}
