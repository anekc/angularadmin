import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
declare function customInit();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private settingsService: SettingsService,
               private sidebarS: SidebarService ){ }

  ngOnInit(): void {
    customInit();
    this.sidebarS.cargarMenu();
  }

}
