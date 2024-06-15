import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/autenticador/auth.service';
import { AlertController } from '@ionic/angular'
import 'firebase/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController ) {}

  email: string='';
  password: string='';
  
  async home() {
    try {
      await this.authService.signInWithEmail(this.email, this.password);
      this.router.navigate(['/user']);
    } catch (error) {
      /* console.log("falou", error) */
      const alert = await this.alertController.create({
        header: 'Erro de Login',
        message: 'Usuário ou senha incorretos.',
        buttons: ['OK']
      });
      await alert.present() ;
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/user']);
    } catch (error) {
      console.log("falou", error)
/*       const alert = await this.alertController.create({
        header: 'Erro de Login',
        message: 'Usuário ou senha incorretos.',
        buttons: ['OK']
      });
      await alert.present(); */
    }
  }
}
