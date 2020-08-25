import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import {  retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent {
  constructor() {
    this.retornaObservable();

    // this.retornaIntervalo()
    // .subscribe((valor) => console.log(valor));
  }

  retornaIntervalo(){
 const interval$ = interval(1000);
 return interval$;
  }

  retornaObservable(): Observable<number>{
    let i = -1;

    const obs$ = new Observable<number>((observer) => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2){
           observer.error('i llegó al valor de 2');
        }
      }, 1000);
    });

    // obs$.pipe(
    // retry()
    // ).subscribe(
    // valor => console.log('Subs:', valor),
    // err => console.warn('Error', err),
    // () => console.warn('Obs terminado')
    // );

    return obs$;
  }
  }


