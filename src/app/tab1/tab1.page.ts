import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  presupuesto: number;
  newPresupuesto: number;
  dataPresupuesto: any[];

  constructor() {

    //TODO: Si existe data, presupuesto en localstorage, cargarlo. Sino 0.
    this.presupuesto = 0;
    this.newPresupuesto= null;
    this.dataPresupuesto=[];
  }


  agregarPresupuesto(){
    console.log('Agregando Presupuesto', this.newPresupuesto);
    this.presupuesto+=this.newPresupuesto;

    const newDate= new Date();

    const newData = {
      desc: 'Nueva quincena',
      value: this.newPresupuesto,
      date: newDate
    };
    this.dataPresupuesto.push(newData);
    this.newPresupuesto = null;

    console.log(this.dataPresupuesto);
  }

  resetPresupuesto(){
    console.log('Resetear Presupuesto');
    this.presupuesto = 0;
    this.newPresupuesto = null;
    this.dataPresupuesto=[];
  }

}
