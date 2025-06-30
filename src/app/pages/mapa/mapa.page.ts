import { Component, OnInit } from '@angular/core';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';
import { AlertController,  LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: false
})


export class MapaPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }
  async getCurrentPosition() {
      const loading = await this.loadingCtrl.create({
      message: 'Obteniendo tu ubicación...',
      spinner: 'circles',
    });
    await loading.present();

    try {
      const status: PermissionStatus = await Geolocation.requestPermissions();

      if (status.location !== 'granted') {
         await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Permiso denegado',
          message: 'Activa la ubicación desde la configuración del dispositivo.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const mapFrame: HTMLIFrameElement | null = document.getElementById('mapFrame') as HTMLIFrameElement;
      if (mapFrame) {
        mapFrame.src = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
      }

      await loading.dismiss();

      const toast = await this.toastCtrl.create({
        message: 'Ubicación cargada correctamente.',
        duration: 2000,
        color: 'toast-personalizado'
      });
      await toast.present();

    } catch (error) {
      await loading.dismiss();
      console.error('Error al obtener la ubicación:', error);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No fue posible obtener tu ubicación.',
        buttons: ['OK']

      });
      await alert.present();
    }
  }
}