import { Component} from '@angular/core';

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

  constructor() { }

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
}


