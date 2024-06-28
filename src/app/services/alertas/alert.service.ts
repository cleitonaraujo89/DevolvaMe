import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alerta: AlertController) { }

  async msgAlerta(head: string, msg: string){ // alerta caso algo esteja errado
    const algoErrado = await this.alerta.create({
      header: head,
      message: msg,
      buttons: ['OK']
    })
    await algoErrado.present();
  }

  async msgAlertaAtualiza(head: string, msg: string){ // alerta caso algo esteja errado
    const algoErrado = await this.alerta.create({
      header: head,
      message: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            window.location.reload()
          }
        }
      ]
    })
    await algoErrado.present();
  }
}
