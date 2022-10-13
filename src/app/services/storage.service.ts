import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public localPresupuesto;
  public localDebito;
  public localHistory: any[] = [];
  public localGastos: any[] = [];

  private storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.init();
  }

  async init() {
    const storageIns = await this.storageService.create();
    this.storage = storageIns;
    await this.loadHistory();
    await this.loadPresupuesto();
    await this.loadGastos();
    await this.loadDebito();
  }

  //Cargas de datos
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

  async loadDebito() {
    try {
      const debito = await this.storage.get('debito');
      console.log('Cargando debito', debito);

      this.localDebito = debito || 0;
    } catch (error) {
      this.localDebito = 0;
    }
  }

  async loadGastos() {
    try {
      const gastos = await this.storage.get('gastos');
      console.log('Cargando History', gastos);
      this.localGastos = gastos || [];
    } catch (error) {
      this.localGastos = [];
    }
  }

  //Salvar en local storage
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

  async saveGasto(newDataGasto: any) {

    let newGasto = await this.storage.get('gastos') || [];
    newGasto = [...newGasto, newDataGasto];
    console.log(newGasto);

    let newDebito = await this.storage.get('debito') || 0;
    newDebito = newDebito + newDataGasto.monto;

    this.localDebito = await this.storage.set('debito', newDebito);
    this.localGastos = await this.storage.set('gastos', newGasto);
  }

   remove() {
    Promise.all([
      this.storage.remove('presupuesto'),
      this.storage.remove('history'),
      this.storage.remove('gastos'),
      this.storage.remove('debito'),
    ]);

    this.loadHistory();
    this.loadPresupuesto();
    this.loadGastos();
    this.loadDebito();
  }
}
