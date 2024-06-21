import { Component} from '@angular/core';
import * as qrcode from 'qrcode';
import * as CanvasJS from 'canvasjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage  {

  backgroundImage: string = "assets/imagens/testebg.jpg";
  centerImage: string = 'assets/imagens/googleP.png';
  qrCodeImage: string = '';

  constructor() { }

  ngOnInit() {
    
  }
  

  async generateQRCode() {
    const qrCodeText = 'netflix.com.br';
    const qrCodeBase64 = await this.generateQRCodeBase64(qrCodeText);

    this.drawQRCode(qrCodeBase64);
  }

  async generateQRCodeBase64(qrCodeText: string): Promise<string> {
    const qrCode = await qrcode.toDataURL(qrCodeText);
    return qrCode.replace('data:image/png;base64,', '');
  }

  async drawQRCode(qrCodeBase64: string) {
    const canvas = document.getElementById('qrCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    console.log(ctx);

    // Desenhe a imagem de fundo
    const backgroundImage = new Image();
    backgroundImage.onload = () => {
      if (ctx) {
        ctx.drawImage(backgroundImage, 0, 0);
      } else {
        console.error('Canvas context not found!');
      }

      // Desenhe o QR Code
      const qrCodeImage = new Image();
      qrCodeImage.onload = () => {
        // Calcule a posição do QR Code no centro
        const qrCodeSize = 100; // Tamanho desejado do QR Code
        const x = (canvas.width - qrCodeSize) / 2;
        const y = (canvas.height - qrCodeSize) / 2;

        if (ctx) {
          ctx.drawImage(qrCodeImage, x, y, qrCodeSize, qrCodeSize);
        } else {
          console.error('Canvas context not found!');
        }
        // Converta o canvas para base64
        this.qrCodeImage = canvas.toDataURL();
      };
      qrCodeImage.src = `data:image/png;base64,${qrCodeBase64}`;
    };
    backgroundImage.src = this.backgroundImage;
  }
}


