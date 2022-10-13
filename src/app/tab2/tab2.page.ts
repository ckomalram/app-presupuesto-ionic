import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  handlerMessage = '';
  roleMessage = '';

  montoDebito: number;
  detalleGasto: string;

  constructor(    private alertController: AlertController,
    private toatCtrl: ToastController,
    public storageService: StorageService) {
      this.montoDebito = null;
      this.detalleGasto= null;

    }

    async agregarGastos(){
      console.log(this.detalleGasto);
      console.log(this.montoDebito);

      const diferencia = this.storageService.localPresupuesto - this.storageService.localDebito;

      if (this.montoDebito >= diferencia) {
        this.presentAlertNoMonto();
        return;
      }

      const detalleg = this.detalleGasto || 'otros';
      const dataGasto = {
        desc: detalleg,
        monto: this.montoDebito
      };

      await this.storageService.saveGasto(dataGasto);
      this.montoDebito = null;
      this.detalleGasto= null;

      this.presentToast('top', 'Gasto Ingresado satisfactoriamente!');

    }

    async presentAlertNoMonto() {
      const alert = await this.alertController.create({
        header: 'Montos Insuficientes',
        subHeader: 'No cuentas con presupuesto',
        message: 'Revisa tu presupuesto ya que no puedes agregar este gasto por falta de credito registrado.',
        buttons:  ['OK'],
      });

      await alert.present();
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
