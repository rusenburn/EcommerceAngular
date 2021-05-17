import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IHasForm } from 'src/app/models/IHasForm.interface';

@Injectable({
  providedIn: 'root'
})
export class HasFormCanDeactivateGuardService implements CanDeactivate<IHasForm> {
  constructor() { }

  canDeactivate(
    component: IHasForm,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
    if (component.getForm && component.getForm().dirty) {
      return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }

}
