import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/autenticador/auth.service';
import { AlertService } from '../services/alertas/alert.service';
import 'firebase/compat/auth';
import { DBfireService } from '../services/fire_store/dbfire.service';
import { User } from '../interfaces/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage  {

  selectedImage: string | ArrayBuffer | null = 'assets/imagens/pingo.jpg';
  nomeHead: string="";
  userId: string= "";
  nome: string ="";
  tel1: string= "";
  tel2: string= "";
  whats: string= "";
  email: string ="";
  insta: string= "";
  face: string= "";
  termos: boolean= false;
  novoUsuario: boolean = false;

  imgUrl: string="";

  userCad: User | undefined;

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

  constructor(private alerta: AlertService, private route: ActivatedRoute, private dbFire: DBfireService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
 
    this.userId = this.route.snapshot.paramMap.get('uid') ?? '';
    console.log(this.userId)
    
    if(this.userId){
      this.user.uid = this.userId
      this.checaUser();      
    }
    
  }

  async checaUser(){
    return this.dbFire.getUser(this.userId).subscribe(userData => {
      this.userCad = userData;
     
      if(this.userCad === undefined){
        console.log("n encontrou");
        this.nomeHead = "Informe seu nome!";
        this.novoUsuario = true;
      } else {
        this.nomeHead = this.userCad.nome;
        this.nome = this.userCad.nome;
        this.tel1 = this.userCad.tel1;
        this.tel2 = this.userCad.tel2;
        this.whats = this.userCad.whats;
        this.email = this.userCad.email;
        this.insta = this.userCad.insta;
        this.face = this.userCad.face;
        this.imgUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:8100/perfil/" + this.userId;
        
      }
    });     
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

      this.user.nome = this.nome;
      this.user.tel1 = this.tel1;
      this.user.tel2 = this.tel2;
      this.user.whats = this.whats;
      this.user.email = this.email;
      this.user.insta = this.insta;
      this.user.face = this.face;
     

      if(this.novoUsuario){        
        this.dbFire.createUser(this.user); // se for novo cadastra

      } else{ // caso contrário atualiza
        this.dbFire.updateUser(this.userId, this.user)
      }

      this.alerta.msgAlertaAtualiza("Dados Salvos", "Tudo certo! Dados atualizados.")
    }
  }

  logOut(){
    this.auth.signOut();
    this.router.navigate(['/home']);

  }
}


