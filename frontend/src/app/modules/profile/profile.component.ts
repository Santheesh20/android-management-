import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { UserProfile } from '../../core/models/profile.model';

import { AuthService } from '../../core/services/auth.service';


function passwordsMatch(
  group: AbstractControl
): ValidationErrors | null {

  const next =
    group.get('newPassword')?.value;

  const confirm =
    group.get('confirmPassword')?.value;

  if (
    next &&
    confirm &&
    next !== confirm
  ) {
    return {
      mismatch: true
    };
  }

  return null;
}


@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: UserProfile | null = null;

  showModal = false;

  loading = false;

  saving = false;

  successMessage = '';

  errorMessage = '';

  show = {
    current: false,
    next: false,
    confirm: false
  };

  form: FormGroup;


  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {

    this.form = this.fb.group(
      {
        currentPassword: [
          '',
          [
            Validators.required
          ]
        ],

        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ],

        confirmPassword: [
          '',
          [
            Validators.required
          ]
        ]
      },
      {
        validators: passwordsMatch
      }
    );
  }


  ngOnInit(): void {

    this.loadProfile();
  }


  get initial(): string {

    return this.user?.username
      ?.charAt(0)
      .toUpperCase() || '?';
  }


  get currentPassword(): AbstractControl {

    return this.form.get(
      'currentPassword'
    )!;
  }


  get newPassword(): AbstractControl {

    return this.form.get(
      'newPassword'
    )!;
  }


  get confirmPassword(): AbstractControl {

    return this.form.get(
      'confirmPassword'
    )!;
  }


  loadProfile(): void {

    this.loading = true;

    this.errorMessage = '';

    this.authService
      .getMe()
      .subscribe({

        next: (response) => {

          this.loading = false;

          if (!response.success) {

            this.errorMessage =
              response.message ||
              'Unable to load your profile.';

            this.changeDetectorRef.detectChanges();

            return;
          }

          this.user =
            response.data.user;

          this.changeDetectorRef.detectChanges();
        },

        error: (
          error: HttpErrorResponse
        ) => {

          this.loading = false;

          if (error.status === 401) {

            this.errorMessage =
              'Your session has expired. Please log in again.';

            this.changeDetectorRef.detectChanges();

            return;
          }

          if (error.status === 403) {

            this.errorMessage =
              'You are not allowed to access this profile.';

            this.changeDetectorRef.detectChanges();

            return;
          }

          this.errorMessage =
            'Unable to load your profile. Please try again.';

          this.changeDetectorRef.detectChanges();
        }
      });
  }


  openModal(): void {

    this.form.reset();

    this.show = {
      current: false,
      next: false,
      confirm: false
    };

    this.errorMessage = '';

    this.showModal = true;
  }


  @HostListener(
    'document:keydown.escape'
  )
  closeModal(): void {

    if (!this.saving) {

      this.showModal = false;
    }
  }


  submitPassword(): void {

    this.errorMessage = '';

    this.successMessage = '';

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    if (this.saving) {

      return;
    }

    const currentPassword =
      this.currentPassword.value;

    const newPassword =
      this.newPassword.value;

    this.saving = true;


    this.authService
      .changePassword({
        currentPassword:
          currentPassword,

        newPassword:
          newPassword
      })
      .subscribe({

        next: (response) => {

          this.saving = false;

          if (!response.success) {

            this.errorMessage =
              response.message ||
              'Unable to change your password.';

            this.changeDetectorRef.detectChanges();

            return;
          }

          this.form.reset();

          this.show = {
            current: false,
            next: false,
            confirm: false
          };

          this.showModal = false;

          this.successMessage =
            'Password changed successfully. Please log in again.';

          this.changeDetectorRef.detectChanges();

          setTimeout(() => {

            this.router.navigate([
              '/login'
            ]);

          }, 1200);
        },

        error: (
          error: HttpErrorResponse
        ) => {

          this.saving = false;

          if (error.status === 400) {

            this.errorMessage =
              error.error?.message ||
              'The current password is incorrect or the new password is invalid.';

            this.changeDetectorRef.detectChanges();

            return;
          }

          if (error.status === 401) {

            this.errorMessage =
              'Your session has expired. Please log in again.';

            this.changeDetectorRef.detectChanges();

            return;
          }

          if (error.status === 403) {

            this.errorMessage =
              'You are not allowed to change your password.';

            this.changeDetectorRef.detectChanges();

            return;
          }

          if (error.status === 429) {

            this.errorMessage =
              'Too many password change attempts. Please try again later.';

            this.changeDetectorRef.detectChanges();

            return;
          }

          this.errorMessage =
            'Unable to change your password. Please try again.';

          this.changeDetectorRef.detectChanges();
        }
      });
  }
}