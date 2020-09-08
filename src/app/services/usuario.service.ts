import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-froms.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
declare const gapi: any;
import { tap , map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router) {
  this.googleInit();
               }

  get token(){
    return localStorage.getItem('token') || '';
  }

  get uid(){
    return this.usuario.uid || '';
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
    }).pipe(
    map( (resp: any)  => {
      const { email, google, nombre, role, uid, img = ''} = resp.usuario;
      this.usuario = new Usuario (nombre, email, '', img , google, role, uid );
      localStorage.setItem('token', resp.token);
      return true;
    }),
     catchError(error => of (false))
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

actualizarPerfil(data: { email: string, nombre: string, role: string} ) {
  data = {
  ...data,
  role: this.usuario.role
  };
  return this.http.put(`${base_url}/usuarios/${this.uid}` , data, {
    headers:  {
      'x-token': this.token
    }
  });
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
