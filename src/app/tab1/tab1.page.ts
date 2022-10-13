import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  newPresupuesto: number;

  constructor(public storageService: StorageService) {
    //TODO: Si existe data, presupuesto en localstorage, cargarlo. Sino 0.
    this.newPresupuesto = null;
  }


  async agregarPresupuesto() {
    console.log('Agregando Presupuesto', this.newPresupuesto);
   await this.storageService.savePresupuesto(this.newPresupuesto);

     const newDate = new Date();

    const newData = {
      desc: 'Quincena',
      value: this.newPresupuesto,
      date: newDate,
    };

    await this.storageService.saveHistory(newData);
    this.newPresupuesto = null;
  }

  resetPresupuesto() {
    console.log('Resetear Presupuesto');
    this.newPresupuesto = null;
    this.storageService.remove();
  }
}
