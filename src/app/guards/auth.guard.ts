import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private us: UsuarioService,
              private rt: Router) {}
  canActivate = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {

      return this.us.validarToken()
      .pipe(tap( estaAutehnticado => {
        if (!estaAutehnticado){
          this.rt.navigateByUrl('/login');
        }
      }));
  }
}

