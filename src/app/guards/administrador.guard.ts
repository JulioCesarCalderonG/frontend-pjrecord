import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router){
  }
  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.getToken() !== null) {
      const dataDecode: any = this.decodeToken();
      const date = new Date();
      // Comprobar que no esta caducado el token
      if (dataDecode.exp < date.getTime() / 1000) {
        return this.redirect();
      }
      return true;
    }
    return this.redirect();
    /* if (this.authService.loggedIn()) {
    return true;
  }
  this.router.navigate(['/login']);
  return false; */
  }
  redirect() {
    this.router.navigate(['/']);
    return false;
  }
  decodeToken() {
    return jwtDecode(`${this.authService.getToken()}`);
  }

}
