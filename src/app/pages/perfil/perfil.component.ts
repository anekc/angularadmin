import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
public perfilForm: FormGroup;
  constructor(private fb: FormBuilder,
              private us: UsuarioService) { }

  ngOnInit(): void {
   this.perfilForm = this.fb.group({
     nombre: ['123', [Validators.required]],
     email: ['abc', [Validators.required, Validators.email] ]
   });
  }
actualizarPerfil(){
  console.log(this.perfilForm.value);
  this.us.actualizarPerfil(this.perfilForm.value).subscribe(resp => {console.log(resp); });
}
}
