import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-froms.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
declare const gapi: any;
import { tap , map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router) {
  this.googleInit();
               }


googleInit(){

  return new Promise(resolve => {
    console.log('google init');
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '195265579519-jded13qf2d0eujivt85ncsee90n2cu26.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      resolve();
    });

  });

}

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

 logout =  () => {
   localStorage.removeItem('token');
   this.auth2.signOut().then(() => {
   this.router.navigateByUrl('/login');
    });
  }
}
