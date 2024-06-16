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
  numero: string='';
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

    if (this.cep.length != 8 || this.nome.length < 6 || this.email.length < 6 || this.rua.length < 2 || this.bairro.length < 2 || this.cidade.length < 4 || this.uf.length < 2 ){
      const dados = await this.alertController.create({
        header: 'Dados inválidos',
        message: 'Cheque novamente os dados digitados',
        buttons: ['OK']
      })
      await dados.present();
    }
  }

  formatCep(event: any) {
    let value = event.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    if (value.length > 8) {
      value = value.slice(0, 8); // Limita o valor a 8 dígitos
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5); // Adiciona o hífen
    }
    this.cep = value; // Atualiza o valor do CEP
    console.log(this.cep)
  }

  getCepNumbers() {
    return this.cep.replace(/\D/g, ''); // Remove o hífen e retorna apenas os números
  }
}