import { Component, OnInit } from '@angular/core';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: false
})


export class MapaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  async getCurrentPosition() {
    try {
      const status: PermissionStatus = await Geolocation.requestPermissions();

      if (status.location !== 'granted') {
        const requestPermissions = await Geolocation.requestPermissions();
        if (requestPermissions.location !== 'granted') {
          alert('Permiso de ubicación denegado. Por favor, habilítalo en la configuración de tu dispositivo.');
          return;
        }
      }
       
    //Obtener la ubicacion actual
      const position = await Geolocation.getCurrentPosition({
       enableHighAccuracy: true,
    });

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const mapFrame: HTMLIFrameElement | null = document.getElementById(
      'mapFrame'
    ) as HTMLIFrameElement | null;
    if (mapFrame) {
      mapFrame.src = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
    }
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }
}
