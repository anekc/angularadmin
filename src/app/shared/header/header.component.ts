import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
public usuario: Usuario;

  constructor(private usuarioS: UsuarioService) {

    this.usuario = usuarioS.usuario;
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioS.logout();
  }

}
