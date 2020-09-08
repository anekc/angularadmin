import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
public perfilForm: FormGroup;
public usuario: Usuario;
public imagenSubir: File;
public imgTemp = null ;
  constructor(private fb: FormBuilder,
              private us: UsuarioService,
              private fileUp: FileUploadService) {
  this.usuario = us.usuario;
              }

  ngOnInit(): void {
   this.perfilForm = this.fb.group({
     nombre: [this.usuario.nombre, [Validators.required]],
     email: [this.usuario.email, [Validators.required, Validators.email] ]
   });
  }
actualizarPerfil(){
  console.log(this.perfilForm.value);
  this.us.actualizarPerfil(this.perfilForm.value)
  .subscribe(() => {
    const {nombre, email} = this.perfilForm.value;
    this.usuario.nombre = nombre;
    this.usuario.email = email;
    // Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: 'Usuario Actualizado',
    //   showConfirmButton: false,
    //   timer: 1500
    // });
// notificación
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-start',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Usuario Actualizado'
    } );
   }, (err) => {
    //  Swal.fire('Error', err.error.msg, 'error');
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-start',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'error',
      title: err.error.msg
    } );
   } ) ;
  }

cambiarImagen(file: File){
  this.imagenSubir = file;

  if (!file)
  {return this.imgTemp = null; }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    this.imgTemp = reader.result;
    console.log(reader.result);
  };
}

  subirImagen() {
    this.fileUp.actualizarfoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'imagen Actualizada'
        });
      }).catch(err => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-start',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });

        Toast.fire({
          icon: 'error',
          title: err.error.msg
        } );
      });
  }
}
