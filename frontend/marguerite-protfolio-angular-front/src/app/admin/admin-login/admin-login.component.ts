import {ChangeDetectorRef, Component} from '@angular/core';
import AuthService from "../../../services/auth/auth-service";
import {ErrorDto} from "../../../lib/dtos/error-dto";
import {GenericHttpClient} from "../../../lib/requests/generic-http-client";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  standalone: false
})
export class AdminLoginComponent {

  loadingRequest: boolean = false;
  formSent: boolean = false;
  errors: string[] = [];

  password: string = '';

  constructor(private readonly authService: AuthService,
              private readonly cdRef: ChangeDetectorRef) {
  }

  login(): void {
    this.loadingRequest = true;
    this.formSent = false;
    this.errors = [];

    this.authService.login(this.password)
        .subscribe({
            next: (token: { token: string }) => {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(GenericHttpClient.accessTokenLocalStorageName, token.token)
                }
                this.loadingRequest = false;
                globalThis.location.reload()
            },
            error: (err: ErrorDto) => {
                this.errors = [err.error || 'Une erreur est survenue lors de la connexion.'];
                this.loadingRequest = false;
                this.formSent = true;
                this.cdRef.detectChanges();
            }
        })
  }

}
