import {Component, OnInit} from '@angular/core';
import {} from 'googlemaps';
import { UserLocationService } from './core/services/user-location/user-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userLocation: UserLocationService) {
  }

  ngOnInit(): void {
    this.userLocation.getUserLocation();
  }

}
