import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  password: string = '';
  hide: boolean = true;
  loginDisabled: boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.loginDisabled = !this.loginForm.valid;
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.getRawValue();

      localStorage.setItem('currentUser', username);
      localStorage.setItem('currentPassword', password);

      this.router.navigate(['/form']);
    } else {
      alert('Por favor, preencha todos os campos');
    }
  }

  redirectToPasswordPage() {
    this.router.navigate(['/authentication/password']);
  }

  redirectFormPage() {
    this.router.navigate(['/form']);
  }
}

//form control group
