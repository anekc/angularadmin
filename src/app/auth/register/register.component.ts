import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Alejandro', [Validators.required, Validators.minLength(3)]],
    email: ['ale100@gmail.com', [Validators.email, Validators.required]],
    password: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]],
    terminos: [true, [ Validators.required]]

  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService) { }


  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if ( this.registerForm.invalid){
      return;
    }

    // realizar posteo

    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe(resp => {
      console.log('usuario creado');
      console.log(resp);
    }, (err) =>{
      Swal.fire(
        'Error',
        err.error.msg, 'error');
    } );


  }

  campoNOValido(campo: string): boolean{
    if (this.registerForm.get(campo).invalid &&  this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }


  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if ((pass1 !== pass2) && this.formSubmitted){
      return true;
    }else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) =>{
const pass1Control = formGroup.get(pass1Name);
const pass2Control = formGroup.get(pass2Name);

if (pass1Control.value === pass2Control.value){
pass2Control.setErrors(null)
} else {
  pass2Control.setErrors({noEsIgual: true});
}
    };
  }
}
