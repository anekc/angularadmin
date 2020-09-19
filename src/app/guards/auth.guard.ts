import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private us: UsuarioService,
              private rt: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.us.validarToken()
      .pipe(tap( estaAutehnticado => {
        if (!estaAutehnticado){
          this.rt.navigateByUrl('/login');
        }
      }));
  }
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

