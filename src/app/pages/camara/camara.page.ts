import { Component, OnInit } from '@angular/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: false,
})


export class CamaraPage implements OnInit {

  photo: string = '';

  constructor(private menu : MenuController,
              private camera: Camera) { }
  

  ngOnInit() {
  }
async takePhoto() {
  const image = await this.camera.getPicture({
    quality: 100,
    allowEdit: true,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  });


   this.photo = image.dataUrl;
    } catch (error: unknown) {
      console.error('Error al tomar la foto', error);
    }

}



