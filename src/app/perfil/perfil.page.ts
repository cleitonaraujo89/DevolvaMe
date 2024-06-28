import { Component, OnInit } from '@angular/core';
import { DBfireService } from '../services/fire_store/dbfire.service';
import { User } from '../interfaces/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  userId: string= "";
  userCad: User | undefined;

  nome: string ="";
 
  tel1: string= "";
  mostraTel1: boolean = false;

  tel2: string= "";
  mostraTel2: boolean = false;

  whats: string= "";
  mostraWhats: boolean = false;

  email: string ="";
  mostraEmail: boolean = false;

  insta: string= "";
  mostraInsta: boolean = false;

  face: string= "";
  mostraFace: boolean = false;

  constructor(private route: ActivatedRoute, private dbFire: DBfireService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('uid') ?? '';

    if(this.userId){
      this.pegaDados(); 

    }
  }

  async pegaDados(){
    this.dbFire.getUser(this.userId).subscribe(userData => {
      this.userCad = userData;

      if(this.userCad === undefined){
        console.log("n encontrou");
     
      } else {
       
        this.nome = this.userCad.nome;

        if(this.userCad.tel1.length > 5){
          this.tel1 = this.userCad.tel1;
          this.mostraTel1 = true
        }
        
        if(this.userCad.tel2.length > 5){
          this.tel2 = this.userCad.tel2;
          this.mostraTel2 = true
        }
        
        if(this.userCad.whats.length > 5){
          this.whats = this.userCad.whats;
          this.mostraWhats = true
        }

        if(this.userCad.email.length > 5){
          this.email = this.userCad.email;
          this.mostraEmail = true
        }
        
        if(this.userCad.insta.length > 5){
          this.insta = this.userCad.insta;
          this.mostraInsta = true
        }
        
        if(this.userCad.face.length > 5){
          this.face = this.userCad.face;
          this.mostraFace = true
        }
               
      }
    })
  }

 
}
