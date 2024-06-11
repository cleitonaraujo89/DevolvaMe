import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/autenticador/auth.service';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string='';
  password: string='';

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController ) {}

  async login() {
    try {
      await this.authService.signInWithEmail(this.email, this.password);
      this.router.navigate(['/user']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Erro de Login',
        message: 'Usuário ou senha incorretos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/consulta-endereco']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Erro de Login',
        message: 'Usuário ou senha incorretos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}