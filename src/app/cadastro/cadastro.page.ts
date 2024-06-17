import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/autenticador/auth.service';
import { AlertController } from '@ionic/angular'
import { ViaCepService } from '../services/via_cep/via-cep.service';
import 'firebase/compat/auth';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController, private viaCepService: ViaCepService ) {}

  nome: string='';
  email: string='';
  password: string='';
  confirmaPassword: string='';
  cepDigitado: string='';
  cepAPI: string='';
  rua: string='';
  numero: string='';
  bairro: string='';
  cidade: string='';
  uf: string='';
  dados: any='';
 
  async checar(){
    if (this.password !== this.confirmaPassword || this.password.length < 6){
      const senhaDif = await this.alertController.create({
        header: 'Senhas Inválidas',
        message: 'A Senha digitada tem menos de 6 dígitos ou difere da confirmação.',
        buttons: ['OK']
      })
      await senhaDif.present();
    } else if (this.cepAPI.length != 8 || this.nome.length < 6 || this.email.length < 6 || this.rua.length < 2 || this.bairro.length < 2 || this.cidade.length < 4 || this.uf.length < 2 ||this.cepDigitado.replace('-', '') != this.cepAPI){
      const dadosErro = await this.alertController.create({
        header: 'Dados inválidos',
        message: 'Cheque novamente os dados digitados',
        buttons: ['OK']
      })
      await dadosErro.present();

    }
  }

  formatNome(event: any) {
    let nome = event.target.value.replace(/[^a-zA-Z\s]/g, ''); // Remove qualquer 
    this.nome = nome;
  }

  formatCep(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    if (value.length > 8) {
      value = value.slice(0, 8); // Limita o valor a 8 dígitos
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5); // Adiciona o hífen
    }

    this.cepDigitado = value; // Atualiza o valor do CEP
    console.log(this.cepDigitado);

    if (this.cepDigitado.length === 9) {
      this.cepAPI = this.cepDigitado.replace('-', ''); // Remove o traço
      this.consultarCep();
      
    }    
  }

  consultarCep() {
    this.viaCepService.getDados(this.cepAPI).subscribe(
      (data) => {
        this.dados = data;
        this.rua = this.dados.logradouro;
        this.bairro = this.dados.bairro;
        this.cidade = this.dados.localidade;
        this.uf = this.dados.uf;
        if(this.dados.erro){
          this.erroCep();
        }
      },
      (erro) => {
        this.erroCep();
      }
    );
  }

  async erroCep(){
    const cepBixado = await this.alertController.create({
      header: 'Cep Inválido',
      message: 'Cheque novamente o cep digitado',
      buttons: ['OK']
    })
    await cepBixado.present();

  }

}


