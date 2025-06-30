import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MisDatosService {
  
 // variable para manipular la conexion a la base de datos
  // Se define como public para poder acceder a ella desde otros componentes
  public db!: SQLiteObject;
  
   private currentUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');

  //observable para manipular si la base de datos esta lista
  // Se define como private para que no se pueda acceder directamente desde otros componentes
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor( 
    private sqlite: SQLite, 
    private toastController: ToastController) { 
    this.initDatabase();
    
  }
  private async initDatabase() {
    try {
      this.db = await this.sqlite.create({
        name: 'baseDatos.db',
        location: 'default'
      });
      await this.createTables();
      this.isDBReady.next(true);
      this.presentToast('Tablas y base de datos creadas con éxito');
    } catch (error) {
      console.error('Error inicializando base de datos:', error);
      this.presentToast('Error inicializando base de datos');
    }
  }


//Crear tabla con los nuevos campos
 private async createTables(): Promise<void> {
    const sqlUsers  = `
      CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        apellido TEXT,
        email TEXT UNIQUE,
        username TEXT,
        password TEXT,
        nivel_educacion TEXT,
        fecha_nacimiento TEXT
      )
    `;

     // Crear tabla carrito
    const sqlCarrito = `
      CREATE TABLE IF NOT EXISTS carrito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        precio REAL,
        foto TEXT
      )
    `;
        const sqlDespacho = `

      CREATE TABLE IF NOT EXISTS despacho (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      telefono TEXT,
      calle_numero TEXT,
      comuna TEXT,
      ciudad TEXT,
      region TEXT
      )
    `;

      try {
        await this.db.executeSql(sqlUsers, []);
        await this.db.executeSql(sqlCarrito, []);
        await this.db.executeSql(sqlDespacho, []);

        try {
          await this.db.executeSql(`ALTER TABLE users ADD COLUMN foto TEXT`, []);
        }catch (e: any) {
          // Si la columna ya existe, ignorar el error
          if (e.code !== 5) { // 5 es el código de error SQLITE_CONSTRAINT
            throw e;
          }
        } 
        this.presentToast('Tablas creadas correctamente');
      } catch (error) {
        this.presentToast('Error creando tablas: ' + error);
        throw error;
      }
    }


  private async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    await toast.present();

  }

  // Validar usuario
  validarUsuario(username: string, password: string): Promise<any | null> {
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    return this.db.executeSql(sql, [username, password])
      .then(res => {
        return (res.rows.length > 0) ? res.rows.item(0) : null;
      })
      .catch(async error => {
        await this.presentToast('Error al buscar usuario: ' + error);
        return null;
      });
  }

  registerUser(
    nombre: string,
    apellido: string,
    email: string,
    username: string,
    password: string,
    nivelEducacion: string,
    fechaNacimiento: string
  ): Promise<boolean> {
    const sql = `
      INSERT INTO users (nombre, apellido, email, username, password, nivel_educacion, fecha_nacimiento)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    return this.db.executeSql(sql, [nombre, apellido, email, username, password, nivelEducacion, fechaNacimiento])
      .then(async () => {
        await this.presentToast('Usuario registrado exitosamente');
        return true;
      })
      .catch(async error => {
        await this.presentToast('Error al registrar usuario: ' + error);
        return false;
      });
  }

  getIsDBReady() {
    return this.isDBReady.asObservable();
  }

  getUsuarioPorUsername(username: string): Promise<any | null> {
  return this.db.executeSql('SELECT * FROM users WHERE username = ?', [username])
    .then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0);
      } else {
        return null;
      }
    });

    
}

 // Setea username

setUsername(username: string) {
  this.currentUsername.next(username);
}
  // Obtiene username como Observable para suscribirse
getUsername(): Observable<string> {
  return this.currentUsername.asObservable();

}

async obtenerUsuarioPorUsername(username: string): Promise<any> {
  const db = this.db;
  const result = await db.executeSql(
    `SELECT * FROM users WHERE username = ?`,
    [username]
  );

  if (result.rows.length > 0) {
    return result.rows.item(0);
  }

  return null;
}


async actualizarUsuario(usuario: {
  username: string,
  nombre: string,
  apellido: string,
  email: string,
  fecha_nacimiento: string
}): Promise<void> {
  const db = this.db;
  await db.executeSql(
    `UPDATE users SET nombre = ?, apellido = ?, email = ?, fecha_nacimiento = ? WHERE username = ?`,
    [
      usuario.nombre,
      usuario.apellido,
      usuario.email,
      usuario.fecha_nacimiento,
      usuario.username
    ]
  )
  .then(() => this.presentToast('Datos personales actualizados correctamente'))
  .catch(async error => {
    await this.presentToast('Error actualizando datos personales: ' + error);
    throw error;
  });
}


//////////////////////////////////CARRITO/////////////////

// Insertar producto al carrito
agregarProductoCarrito(producto: { nombre: string; precio: number; foto: string }): Promise<void> {
  const sql = `INSERT INTO carrito (nombre, precio, foto) VALUES (?, ?, ?)`;
  return this.db.executeSql(sql, [producto.nombre, producto.precio, producto.foto])
    .then(() => this.presentToast('Producto agregado al carrito'))
    .catch(async error => {
      await this.presentToast('Error agregando producto: ' + error);
      throw error;
    });
}

// Obtener productos del carrito
obtenerProductosCarrito(): Promise<any[]> {
  const sql = `SELECT * FROM carrito`;
  return this.db.executeSql(sql, [])
    .then(res => {
      const productos: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        productos.push(res.rows.item(i));
      }
      return productos;
    })
    .catch(async error => {
      await this.presentToast('Error obteniendo productos: ' + error);
      return [];
    });
}

// Limpiar carrito
limpiarCarrito(): Promise<void> {
  const sql = `DELETE FROM carrito`;
  return this.db.executeSql(sql, [])
    .then(() => this.presentToast('Carrito limpiado'))
    .catch(async error => {
      await this.presentToast('Error limpiando carrito: ' + error);
      throw error;
    });
}

////////////////////////////////DESPACHO/////////////////
// Guardar información de despacho
guardarInfoDespacho(
  username: string,
  telefono: string,
  calleNumero: string,
  comuna: string,
  ciudad: string,
  region: string
): Promise<void> {
  const sql = `
    INSERT OR REPLACE INTO despacho (username, telefono, calle_numero, comuna, ciudad, region)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  return this.db.executeSql(sql, [username, telefono, calleNumero, comuna, ciudad, region])
    .then(() => this.presentToast('Dirección guardada correctamente'))
    .catch(async err => {
      console.error('Error guardando dirección:', err); // 👈 Imprimir en consola
      await this.presentToast('Error al guardar dirección: ' + JSON.stringify(err));
      console.error('Error detallado al guardar dirección:', err);
      throw err;
    });
}

// Obtener información de despacho por username
obtenerDespachoPorUsuario(username: string): Promise<any | null> {
  const sql = `SELECT * FROM despacho WHERE username = ?`;
  return this.db.executeSql(sql, [username])
    .then(res => res.rows.length > 0 ? res.rows.item(0) : null)
    .catch(async err => {
      await this.presentToast('Error obteniendo dirección: ' + err);
      return null;
    });
}

// actualizar información de usuario
updateUsuario(
id: number, nombre: string, apellido: string, email: string, username: string, password: string, fechaNacimiento: string, p0: string): Promise<boolean> {
  const sql = `
    UPDATE users
    SET nombre = ?, apellido = ?, email = ?, username = ?, password = ?, fecha_nacimiento = ?
    WHERE id = ?
  `;

  return this.db.executeSql(sql, [nombre, apellido, email, username, password, fechaNacimiento, id])
    .then(() => {
      this.presentToast('Datos actualizados correctamente');
      return true;
    })
    .catch(async error => {
      await this.presentToast('Error actualizando datos: ' + error);
      return false;
    });
}

// Guarda o actualiza la foto en base64 para un usuario dado
async guardarFotoUsuario(username: string, fotoBase64: string): Promise<boolean> {
  try {
    const sql = 'UPDATE users SET foto = ? WHERE username = ?';
    await this.db.executeSql(sql, [fotoBase64, username]);
    console.log('Foto guardada correctamente para el usuario:', username);
    await this.presentToast('Foto guardada correctamente');
    return true;
  } catch (error) {
    await this.presentToast('Error guardando foto: ' + error);
    return false;
  }
}

// Obtiene la foto en base64 para un usuario dado
async obtenerFotoUsuario(username: string): Promise<string | null> {
  try {
    const sql = 'SELECT foto FROM users WHERE username = ?';
    const res = await this.db.executeSql(sql, [username]);
    if (res.rows.length > 0) {
      return res.rows.item(0).foto;
    }
    return null;
  } catch (error) {
    await this.presentToast('Error obteniendo foto: ' + error);
    return null;
  }
}

}


