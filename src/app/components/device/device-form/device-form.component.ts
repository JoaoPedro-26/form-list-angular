import { Component, EventEmitter, Output, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './device-form.component.html',
  styleUrl: './device-form.component.css'
})
export class DeviceFormComponent implements OnInit {
  form: FormGroup;
  deviceData: any;
  isEditing: boolean = false;

  @Output() formSubmit = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      descricao: ['', Validators.required],
      fabricante: ['', Validators.required],
      modelo: ['', Validators.required],
      preco: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const deviceId = this.route.snapshot.paramMap.get('id');

      if (deviceId) {
        const savedDevices = JSON.parse(localStorage.getItem('devices') || '[]');
        const deviceData = savedDevices.find((device: any) => device.id === deviceId);

        if (deviceData) {
          this.deviceData = deviceData;
          this.form.patchValue(deviceData);
          this.isEditing = true;
        } else {
          console.error('Dados não encontrados.');
        }
      } else {
        console.error('ID não fornecido');
      }
    } else {
      console.error('localStorage não está disponível.');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const savedDevices = JSON.parse(localStorage.getItem('devices') || '[]');
      if (this.isEditing) {
        const index = savedDevices.findIndex((device: any) => device.id === this.deviceData.id);
        if (index !== -1) {
          savedDevices[index] = this.form.value;
          localStorage.setItem('devices', JSON.stringify(savedDevices));
        }
      } else {
        const newDevice = { ...this.form.value, id: this.generateId() };
        savedDevices.push(newDevice);
        localStorage.setItem('devices', JSON.stringify(savedDevices));
      }
      this.router.navigate(['form-list']);
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
