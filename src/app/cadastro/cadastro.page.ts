import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/autenticador/auth.service';
import { AlertController } from '@ionic/angular'
import 'firebase/compat/auth';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController ) {}

  nome: string='';
  email: string='';
  password: string='';
  confirmaPassword: string='';
  cep: string='';
  rua: string='';
  bairro: string='';
  cidade: string='';
  uf: string='';
 
  async checar(){
    if (this.password !== this.confirmaPassword || this.password.length < 6){
      const senhaDif = await this.alertController.create({
        header: 'Senhas Inválidas',
        message: 'A Senha digitada tem menos de 6 dígitos ou difere da confirmação.',
        buttons: ['OK']
      })

      await senhaDif.present();
    }
  }


}
