import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  
  public imgSubs: Subscription;
  public cargando = true;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  constructor(private medicoService: MedicoService,
              private modalIMagenService: ModalImagenService,
              private busqueda: BusquedasService) { }
  ngOnDestroy(): void {
  this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalIMagenService.nuevaIMagen.pipe(delay(100)).subscribe( img => this.cargarMedicos());
  }


  cargarMedicos(){

    this.cargando = true;

    this.medicoService.cargarMedicos()
    .subscribe( medicos  => {
      this.cargando = false;
      this.medicos = medicos;
      console.log(medicos); } );


  }

  abrirModal(medico: Medico){
    console.log(medico);
    this.modalIMagenService.abrirModal('medicos', medico._id, medico.img);

  }

  // guardarCambios(medico: Medico){
  //   this.medicoService.actualizarMedico(medico.img);
  //   .subscribe(resp => {
  //     Swal.fire(
  //       'Actualizado',
  //       medico.nombre,
  //       'success'
  //     );
  //   });

  // }

  eliminarMedico(medico: Medico){
    Swal.fire({
      title: 'Borrar medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id).
        subscribe(resp => {
          this.cargarMedicos();
          Swal.fire(
            'Usuario Borrado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );

        });
      }
    });
  }

  buscar(termino: string){
    if (termino.length === 0){
      return this.medicos = this.medicosTemp;
     }
    console.log(termino);
    this.busqueda.buscar('medicos', termino)
     .subscribe((resp: Medico[]) => {
       this.medicos = resp;
     });
  }

}
