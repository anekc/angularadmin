import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
    }
private transfromarUsuarios(resultados: any[]): Usuario[]{
  return resultados.map(
    user => new Usuario(user.nombre, user.email, '' , user.img, user.google , user.role , user.uid));
  }

private transfromarHospitales(resultados: any[]): Hospital[]{
  return resultados;
}

private transfromarMedicos(resultados: any[]): Medico[]{
  return resultados;
}
    buscar(tipo: 'usuarios' |'medicos' | 'hospitales', termino: string = ''){
      const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
      return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transfromarUsuarios(resp.resultados);
            case 'hospitales':
              return this.transfromarHospitales(resp.resultados);
              case 'medicos':
              return this.transfromarMedicos(resp.resultados);
            default:
              return [];
          }
        } ) );


    

    }

    busquedaGlobal(termino: string){

      const url = `${base_url}/todo/${termino}`;
      return this.http.get<any[]>(url, this.headers);


    }

}
