import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponetsModule } from '../components/componets.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


@NgModule({
  declarations: [
    PagesComponent,
    Grafica1Component,
    ProgressComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
  ],
   exports: [
    PagesComponent,
    Grafica1Component,
    ProgressComponent,
    DashboardComponent,
    AccountSettingsComponent
],
  imports: [
  CommonModule,
  SharedModule,
  AppRoutingModule,
  FormsModule ,
  ComponetsModule,
  ReactiveFormsModule

],
})
export class PagesModule { }
