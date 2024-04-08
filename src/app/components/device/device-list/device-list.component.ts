import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit {

  devices: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const devicesData = localStorage.getItem('devices');

      if (devicesData) {
        this.devices = JSON.parse(devicesData);
      }
    }
  }

  editDevice(device: any) {
    console.log("editei algum", device);
    this.router.navigate(['form', device.id]);
  }

  deleteDevice(device: any) {
    this.devices = this.devices.filter(d => d !== device);
    localStorage.setItem('devices', JSON.stringify(this.devices));
  }

  goToForm() {
    this.router.navigate(['/form']);
  }

}
