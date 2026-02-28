import {ChangeDetectorRef, Component} from '@angular/core';
import AuthService from "../../../services/auth/auth-service";
import {PasswordRequestDTO} from "../../../dtos/auth/password-request-dto";
import {ErrorDto} from "../../../lib/dtos/error-dto";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  standalone: false
})
export class PasswordComponent {

  currentPassword: string = '';
  currentPasswordErrors: string[] = [];

  newPassword: string = ''
  newPasswordErrors: string[] = [];

  confirmPassword: string = ''
  confirmPasswordErrors: string[] = [];

  formSent: boolean = false;
  loading: boolean = false;

  requestError?: string;

  constructor(private readonly authService: AuthService,
              private readonly cdRef: ChangeDetectorRef) {
  }

  sendRequest() {
    const requestDto = new PasswordRequestDTO()
    requestDto.oldPassword = this.currentPassword;
    requestDto.newPassword = this.newPassword;
    requestDto.confirmPassword = this.confirmPassword;

    this.loading = true;
    this.formSent = false;
    this.requestError = undefined;
    this.currentPasswordErrors = [];
    this.newPasswordErrors = [];
    this.confirmPasswordErrors = [];

    this.authService.setPassword(requestDto).subscribe({
      next: () => {
        this.loading = false;
        this.formSent = true;
        this.cdRef.detectChanges();
      },
      error: (err: ErrorDto) => {
        this.loading = false;

        if (err.status === 400) {
          this.formSent = true;

          for (let fieldError of err.fieldErrors) {
            if (fieldError.field === 'oldPassword') {
              this.currentPasswordErrors.push(fieldError.message);
            } else if (fieldError.field === 'newPassword') {
              this.newPasswordErrors.push(fieldError.message);
            } else if (fieldError.field === 'confirmPassword') {
              this.confirmPasswordErrors.push(fieldError.message);
            }
          }
        } else {
          this.requestError = 'Erreur lors de la modification du mot de passe. Veuillez réessayer ou contacter votre admin.';
        }

        this.cdRef.detectChanges();
      }
    });
  }

}
