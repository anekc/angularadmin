import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;
  constructor(private fb: FormBuilder,
              private hospitalS: HospitalService,
              private medicoS: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      console.log(id);
      this.cargarMedicoById(id);

    })
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]

    });


    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        console.log(hospitalId);
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
      });

  }


  cargarHospitales() {
    this.hospitalS.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }


  guardarMedico() {
    const { nombre } = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      };
      this.medicoS.actualizarMedico(data)
      .subscribe(resp => {
        console.log(resp);
        Swal.fire(
          'Actualizado',
          `${nombre}  Actualizado correctamente`,
          'success');

      });

    } else {

      this.medicoS.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire(
            'Creado',
            `${nombre}  creado correctamente`,
            'success');
          this.router.navigateByUrl(`/dashboard/medicos/${resp.medico._id}`);
        });

    }
  }

  cargarMedicoById(id: string) {

    if (id === 'nuevo'){
    return;
    }
    this.medicoS.obtenerMedicoById(id)
    .pipe(delay(100))
      .subscribe(medico => {
        if (!medico){
          return  this.router.navigateByUrl(`/dashboard/medicos`);
        }
        const { nombre, hospital: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      });
  }

}
