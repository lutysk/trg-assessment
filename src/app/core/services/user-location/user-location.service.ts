import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserCoords } from '../../../shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ModalLocationInfoComponent } from '../../../shared/modal-location-info/modal-location-info.component';
import { INITIAL_COORDS } from '../../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  userLocation$: BehaviorSubject<IUserCoords> = new BehaviorSubject(INITIAL_COORDS);

  constructor(public dialog: MatDialog) {
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation$.next({
            lon: position.coords.longitude,
            lat: position.coords.latitude
          });
        },
        () => {
          this.openLocationModal();
        }
      );
    }
  }

  private openLocationModal(): void {
    const dialogRef = this.dialog.open(ModalLocationInfoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.getUserLocation();
        }
      });
  }
}
