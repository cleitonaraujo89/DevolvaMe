import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/autenticador/auth.service';
import { AlertController } from '@ionic/angular'
import { AlertService } from '../services/alertas/alert.service';
import 'firebase/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController, private alert: AlertService) {}

  email: string='';
  password: string='';
  
  async login() {
    try {
      const uid = await this.authService.signInWithEmail(this.email, this.password);
      this.router.navigate(['/user', uid]);
    } catch (error) {
      /* console.log("falou", error) */
      this.alert.msgAlerta("Erro de login", "Usuário ou senha incorreta");
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/user']);
    } catch (error) {
      
      this.alert.msgAlerta("Erro de login", "Usuário ou senha incorreta");
    }
  }
}
