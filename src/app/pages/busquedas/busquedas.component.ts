import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {
 public usuarios: Usuario[];
 public medicos: Medico[];
 public hospitales: Hospital[];
  constructor(private activatedR: ActivatedRoute,
              private busquedaS: BusquedasService) { }

  ngOnInit(): void {
    this.activatedR.params
    .subscribe(({termino}) => {
      console.log(termino);
      this.busquedaGlobal(termino);
    });
  }

  busquedaGlobal(termino: string){
    this.busquedaS.busquedaGlobal(termino)
    .subscribe((resp: any) => {
this.usuarios = resp.usuarios;
this.medicos = resp.medicos;
this.hospitales = resp. hospitales;
    });
  }


  abrirMedico(medico: Medico){

  }
}
