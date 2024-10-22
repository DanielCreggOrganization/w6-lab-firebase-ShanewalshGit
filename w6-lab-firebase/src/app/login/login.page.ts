import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController, LoadingController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = this.fb.nonNullable.group({
    email: ['daniel.cregg@atu.ie', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {}

  get email() {
    return this.credentials.controls.email;
  }

  get password() {
    return this.credentials.controls.password;
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.login(this.credentials.getRawValue());
    await loading.dismiss();
    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.showAlert('Login failed', 'Please try again!');
    }
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.register(this.credentials.getRawValue());
    await loading.dismiss();
    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.showAlert('Registration failed', 'Please try again!');
    }
  }

  // Add the sendReset function
  async sendReset() {
    const email = this.credentials.controls.email.value;
    if (!email) {
      this.showAlert('Reset failed', 'Please enter your email address');
      return;
    }
    const loading = await this.loadingController.create();
    await loading.present();
    const success = await this.authService.resetPassword(email);
    await loading.dismiss();
    if (success) {
      this.showAlert('Reset email sent', 'Please check your inbox');
    } else {
      this.showAlert('Reset failed', 'Please try again!');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}