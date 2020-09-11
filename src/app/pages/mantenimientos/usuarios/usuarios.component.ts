import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public imgSubs: Subscription;
  public paginaActual = 0;

  public cargando = true;

  constructor(private usuarioService: UsuarioService,
              private busqueda: BusquedasService,
              private modalIMagenService: ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalIMagenService.nuevaIMagen.pipe(delay(100)).subscribe( img => this.cargarUsuarios());
    }

    cargarUsuarios(){
      this.cargando = true;
      this.usuarioService.cargarUsuarios(this.paginaActual)
      .subscribe(({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false; } );
    }

    cambiarPagina(valor: number){
      this.paginaActual += valor;
      if(this.paginaActual < 0 ){
        this.paginaActual = 0;
      } else if (this.paginaActual >= this.totalUsuarios){
        this.paginaActual -= valor;
      }
      this.cargarUsuarios();
    }

    buscar(termino: string){
      if(termino.length === 0){

        return this.usuarios = this.usuariosTemp;
      }
      console.log(termino);
      this.busqueda.buscar('usuarios', termino)
      .subscribe(resultados => {
        this.usuarios = resultados;
      });
    }

    eliminarUsuario(usuario: Usuario){
      if (usuario.uid === this.usuarioService.uid){
        return Swal.fire(
          'Error',
          'No puede borrarse a sí mismo',
          'error'
        );
      }

      Swal.fire({
        title: 'Borrar usuario?',
        text: `Esta a punto de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar'
      }).then((result) => {
        if (result.value) {
          this.usuarioService.eliminarUsuario(usuario).
          subscribe(resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario Borrado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            );

          });
        }
      });
    }

    cambiarRole = (usuario: Usuario) => {
    this.usuarioService.actualizarRole(usuario)
    .subscribe(resp => {
      console.log(resp);
    });
    }

    abrirModal(usuario: Usuario){
      console.log(usuario);
      this.modalIMagenService.abrirModal('usuarios', usuario.uid, usuario.img);
    }
  }




