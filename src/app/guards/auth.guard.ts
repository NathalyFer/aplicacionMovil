import { CanActivate, Router } from '@angular/router';
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router:Router) {}

  canActivate (): boolean{
    const sesionActiva = localStorage.getItem('usuarioActivo') === 'true';

    if (!sesionActiva){
      this.router.navigate(['/login']); //redirige al login si no hay sesión
      return false;
    }
    return true;// permite el acceso
  }
}
  
