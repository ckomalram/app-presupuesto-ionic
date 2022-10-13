import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  handlerMessage = '';
  roleMessage = '';

  newPresupuesto: number;
  detalle: string;

  constructor(
    private alertController: AlertController,
    private toatCtrl: ToastController,
    public storageService: StorageService) {
    //TODO: Si existe data, presupuesto en localstorage, cargarlo. Sino 0.
    this.newPresupuesto = null;
  }


  async agregarPresupuesto() {
    console.log('Agregando Presupuesto', this.newPresupuesto);
   await this.storageService.savePresupuesto(this.newPresupuesto);

     const newDate = new Date();
     const detalles = this.detalle || 'Otros';

    const newData = {
      desc: detalles ,
      value: this.newPresupuesto,
      date: newDate,
    };

    await this.storageService.saveHistory(newData);
    this.newPresupuesto = null;
    this.detalle= null;

    this.presentToast('top', 'Presupuesto agregado');
  }

  resetPresupuesto() {
    console.log('Resetear Presupuesto');
    this.newPresupuesto = null;
    this.storageService.remove();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Reiniciar datos',
      subHeader: '¿Estás seguro?',
      message: 'Al seleccionar proceder, se borrarán presupuesto e historial actual',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Proceder',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
            this.resetPresupuesto();
            this.presentToast('top', 'Datos removidos');
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom' , message) {
    const toast = await this.toatCtrl.create({
      message,
      duration: 1500,
      position
    });

    await toast.present();
  }


}
