import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [

    {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
    {path: 'perfil' , component: PerfilComponent, data: {titulo: 'Perfil'}},
    {path: 'grafica1' , component: Grafica1Component, data: {titulo: 'Gráfica'}},
    {path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'}},
    {path: 'settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Cuenta'}},
    {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
    {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RXJS'}},
    {path: 'buscar/:termino', component: BusquedasComponent, data: {titulo: 'Búsquedas'}},
    // rutas de admin
    {path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Usuarios de aplicación'}},
    // mantenimientos
    {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
    {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Médicos'}},
    {path: 'medicos/:id', component: MedicoComponent, data: {titulo: 'Médicos'}},


]

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [ RouterModule.forChild(childRoutes)

  ]
})
export class ChildRoutesModule { }
