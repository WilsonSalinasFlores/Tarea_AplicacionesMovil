import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

interface Persona {
  nombre: string;
  profesion: string;
  email: string;
  telefono: string;
  color: 'primary' | 'secondary' | 'tertiary' | string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  // Variables en español
  personas: Persona[] = [
    {
      nombre: 'Wilson Salinas',
      profesion: 'Estudiante de Ingeniería',
      email: 'wilsonivansalinasflores@gmail.com',
      telefono: '0987654321',
      color: 'primary'
    },
    {
      nombre: 'Esteban Salinas',
      profesion: 'Importador de Tecnología',
      email: 'esteban.salinas@gmail.com',
      telefono: '0991234567',
      color: 'secondary'
    },
    {
      nombre: 'Wendy Bazurto',
      profesion: 'Gerente de Marca',
      email: 'wendy.bazurto@gmail.com',
      telefono: '0971122334',
      color: 'tertiary'
    }
  ];

  constructor(private toastCtrl: ToastController) {}

  // Método en español
  async mostrarToast(nombre: string) {
    const toast = await this.toastCtrl.create({
      message: `Contactando a ${nombre}`,
      duration: 2000
    });
    await toast.present();
  }

}
