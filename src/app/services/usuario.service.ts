import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-froms.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
declare const gapi: any;
import { tap , map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
  this.googleInit();
               }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
return this.usuario.role;
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get headers(){
  return {
    headers: {
      'x-token': this.token
    }
  };
  }

guardarLocalStorage(token: string, menu: any){
  localStorage.setItem('token', token );
  localStorage.setItem('menu', JSON.stringify(menu));

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
      this.guardarLocalStorage(resp.token, resp.menu);
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
                    this.guardarLocalStorage(resp.token, resp.menu);
                  })
);

}

actualizarPerfil(data: { email: string, nombre: string, role: string} ) {

  data = { ...data,
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
                      this.guardarLocalStorage(resp.token, resp.menu);
                    })
                  );

 }

 loginGoogle(token){

  return this.http.post(`${base_url}/login/google`, {token})
  // pasamos al observable por el tap
                    .pipe(
                     tap((resp: any ) => {
                      // guardamos token en el local Storage
                      this.guardarLocalStorage(resp.token, resp.menu);
                    })
                  );

 }

 logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('menu');

  // TODO borrar menu

  this.auth2.signOut().then(() => {

    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  });

}
  cargarUsuarios(desde: number= 0){
// http://localhost:3005/api/usuarios?desde=0
const url = `${base_url}/usuarios?desde=${desde}`;
return this.http.get<CargarUsuario>(url, this.headers)
.pipe(
  map(resp => {
    const usuarios = resp.usuarios.map(
      user => new Usuario(user.nombre, user.email, '' , user.img, user.google , user.role , user.uid));
    return {
      total: resp.total,
      usuarios
    };
  }));
  }

  eliminarUsuario(usuario: Usuario){
  // http://localhost:3005/api/usuarios/5f4985265489b12098d27732
  const url = `${base_url}/usuarios/${usuario.uid}`;
  return this.http.delete(url, this.headers);
  }

  actualizarRole = (usuario: Usuario ) => {

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

}
