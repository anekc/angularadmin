import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-froms.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

import { tap , map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  validarToken(){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers:  {
        'x-token': token
      }
    }).pipe(tap( (resp: any)  => {
      localStorage.setItem('token', resp.token);
    }), map(resp =>  true
    ), catchError(error => of (false))
    );
    }


crearUsuario(formData: RegisterForm){

 return this.http.post(`${base_url}/usuarios`, formData)
                 .pipe(
                  tap((resp: any ) => {
                    // guardamos token en el local Storage
                    localStorage.setItem('token', resp.token);
                  })
);

}

loginUsuario(formData: LoginForm){

  return this.http.post(`${base_url}/login`, formData)
  // pasamos al observable por el tap
                    .pipe(
                     tap((resp: any ) => {
                      // guardamos token en el local Storage
                      localStorage.setItem('token', resp.token);
                    })
                  );

 }

 loginGoogle(token){

  return this.http.post(`${base_url}/login/google`, {token})
  // pasamos al observable por el tap
                    .pipe(
                     tap((resp: any ) => {
                      // guardamos token en el local Storage
                      localStorage.setItem('token', resp.token);
                    })
                  );

 }
}
