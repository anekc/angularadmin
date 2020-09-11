import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {


public imagenSubir: File;
public imgTemp = null ;

  constructor(public modalImagen: ModalImagenService,
              public fileUp: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal = () => {
  this.imgTemp = null;
  this.modalImagen.cerrarModal();
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

    const id = this.modalImagen.id;
    const tipo = this.modalImagen.tipo;
    this.fileUp.actualizarfoto(this.imagenSubir, tipo , id)
      .then(img => {
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
        this.modalImagen.nuevaIMagen.emit(img);
        this.cerrarModal();
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
