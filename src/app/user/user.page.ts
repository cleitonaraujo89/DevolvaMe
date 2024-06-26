import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/autenticador/auth.service';
import { AlertService } from '../services/alertas/alert.service';
import 'firebase/compat/auth';
import { DBfireService } from '../services/fire_store/dbfire.service';
import { User } from '../interfaces/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage  {

  selectedImage: string | ArrayBuffer | null = 'assets/imagens/pingo.jpg';
  nome: string ="";
  tel1: string= "";
  tel2: string= "";
  whats: string= "";
  email: string ="";
  insta: string= "";
  face: string= "";
  termos: boolean= false;

  user: User = {
    nome: "",
    tel1: "",
    tel2: "",
    whats: "",
    email: "",
    insta: "",
    face: "",
    termos: true,
    uid: ""
    
  };

  constructor(private alerta: AlertService) { }

  ngOnInit() {
    
  }
  
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  formatNome(event: any) { //permite somente letras
    let nome = event.target.value.replace(/[^a-zA-Z\s]/g, ''); 
    this.nome = nome;
  }

  onCheckboxChange(event: CustomEvent) {
    this.termos = event.detail.checked;
  }

  checarInfo(){
    if (!this.termos){
      this.alerta.msgAlerta("Termos de Uso", "Aceite os termos de uso")
    } else if (this.nome.length <2 || (this.tel1.length == 0 && this.tel2.length ==0)){
      this.alerta.msgAlerta("Dados Inválidos", "Por favor verifique os dados informados")
    } else {
      this.alerta.msgAlerta("passou", "passou fino") 
    }
  }
}


