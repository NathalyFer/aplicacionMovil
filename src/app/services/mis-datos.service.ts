import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MisDatosService {

  public db!: SQLiteObject;

  //observable
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor( 
    private sqlite: SQLite, 
    private toastController: ToastController) { 
    this.initDatabase();
  }
  
  private initDatabase() {
    this.sqlite.create({
      name: 'baseDatos.db',
      location: 'default'
    }). then ((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
      this.isDBReady.next(true); // se emite cuando la base de datos no esta lista
      this.presentToast ('Tablas y base de datos creadas con éxito');
    }).catch( error => console.log (error));
  }

  //Crear tabla con los nuevos campos
  private  createTables() {
     this.db.executeSql(
      `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        apellido TEXT,
        email TEXT UNIQUE,
        usuario TEXT,
        password TEXT,
        nivel_educacion TEXT,
        fecha_nacimiento TEXT
     )`,
     [])
     .then (() => this.presentToast ('Table created'))
     . catch (error => this.presentToast ('Error  creating table' + error));
    
  }
  private async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();

  }

  // Validar usuario
  validarUsuario(usuario: string, password: string): Promise<any | null> {
    return this.db.executeSql('SELECT * FROM users WHERE usuario = ? AND password = ?', [usuario, password])
      .then((res) => {
        if (res.rows.length > 0) {
          return res.rows.item(0); //retorna el primer usuario que coincide con los datos ingresados
        } else {
          return null; //null si no se encontro coincidencias
        }
      })
      .catch(error => {
        this.presentToast('Error al buscar usuario con las credenciales:' + error);
        return null;
      });
  }
    

    // Registrar usuario con los nuevos campos
   registerUser(nombre: string, apellido: string, email: string, usuario: string, password: string, nivelEducacion: string, fechaNacimiento: string): Promise<boolean> {
    return this.db.executeSql(
       `INSERT INTO users (nombre, apellido, email,usuario, password, nivel_educacion, fecha_nacimiento)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, email, usuario, password, nivelEducacion, fechaNacimiento])
        .then(() => {
          this.presentToast('Usuario registrado exitosamente');
          return true;
        })
        .catch(error => {
          this.presentToast('Error al registrar usuario:' + error);
          return false;
        });
    }

    getIsDBReady (){
      return this.isDBReady.asObservable();
    }
  }






