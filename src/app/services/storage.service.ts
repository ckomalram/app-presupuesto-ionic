import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public localPresupuesto;
  public localHistory: any[] = [];

  private storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.init();
  }

  async init() {
    const storageIns = await this.storageService.create();
    this.storage = storageIns;
    await this.loadHistory();
    await this.loadPresupuesto();
  }

  async loadHistory() {
    try {
      const history = await this.storage.get('history');
      console.log('Cargando History', history);
      this.localHistory = history || [];
    } catch (error) {
      this.localHistory = [];
    }
  }

  async loadPresupuesto() {
    try {
      const presupuesto = await this.storage.get('presupuesto');
      console.log('Cargando presupuesto', presupuesto);

      this.localPresupuesto = presupuesto || 0;
    } catch (error) {
      this.localPresupuesto = 0;
    }
  }

  async saveHistory(newDataHistory: any) {

    let newHistory = await this.storage.get('history') || [];
    newHistory = [...newHistory, newDataHistory];
    console.log(newHistory);
    this.localHistory = await this.storage.set('history', newHistory);
  }
  async savePresupuesto(newPresupuesto: number) {
    let acumulado = await this.storage.get('presupuesto') || 0 ;
    acumulado = acumulado + newPresupuesto;
    console.log('suma total', acumulado);
   this.localPresupuesto=  await this.storage.set('presupuesto', acumulado);
  }

   remove() {
    Promise.all([
      this.storage.remove('presupuesto'),
      this.storage.remove('history'),
    ]);

    this.loadHistory();
    this.loadPresupuesto();
  }
}
