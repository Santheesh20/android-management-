import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './login.component.html',

  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent {

  /*
   * Controls whether the password is
   * displayed as plain text or hidden.
   */
  showPassword = false;


  /*
   * Prevents multiple login requests
   * from being submitted at the same time.
   */
  isLoading = false;


  /*
   * Stores the error message that should
   * be displayed to the user.
   */
  errorMessage = '';


  /*
   * Current year used by the login page.
   */
  readonly year =
    new Date().getFullYear();


  /*
   * Reactive login form.
   */
  form: FormGroup;


  constructor(
    private readonly fb: FormBuilder,

    private readonly router: Router,

    private readonly authService: AuthService
  ) {

    /*
     * Create the login form.
     */
    this.form = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });
  }


  /*
   * Convenience getter for the email
   * form control.
   */
  get email() {
    return this.form.get('email')!;
  }


  /*
   * Convenience getter for the password
   * form control.
   */
  get password() {
    return this.form.get('password')!;
  }


  /*
   * Handles the login form submission.
   */
  onSubmit(): void {

    /*
     * Remove the previous server error
     * before starting a new login attempt.
     */
    this.errorMessage = '';


    /*
     * Do not send invalid form data
     * to the backend.
     */
    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }


    /*
     * Prevent duplicate submissions while
     * the current login request is running.
     */
    if (this.isLoading) {
      return;
    }


    /*
     * Show the loading state in the UI.
     */
    this.isLoading = true;


    /*
     * Read the values from the form.
     */
    const email =
      this.email.value.trim();

    const password =
      this.password.value;


    /*
     * Send the login request through
     * AuthService.
     *
     * LoginComponent does not know:
     *
     * - API URL
     * - HttpClient
     * - JWT
     * - cookies
     * - refresh tokens
     *
     * Those responsibilities belong
     * to the authentication layer.
     */
    this.authService.login({
      email: email,
      password: password
    })
    .subscribe({
      next: (response) => {
        if (!response.success) {
          this.errorMessage =
            response.message ||
            'Unable to sign in.';
          this.isLoading = false;
          return;
        }

       this.authService
  .getCsrfToken()
  .subscribe({

    next: (csrfResponse) => {

      if (!csrfResponse.success) {

        this.authService.clearSession();

        this.isLoading = false;

        this.errorMessage =
          'Unable to initialize secure authentication. Please try again.';

        return;
      }


      this.router
        .navigate([
          '/dashboard'
        ])
        .then(() => {

          this.isLoading = false;

        })
        .catch(() => {

          this.isLoading = false;

          this.errorMessage =
            'Unable to open the dashboard. Please try again.';

        });
    },


    error: () => {

      this.authService.clearSession();

      this.isLoading = false;

      this.errorMessage =
        'Unable to initialize secure authentication. Please try again.';
    }
  });
      },

      error: (error) => {
        this.isLoading = false;

        if (
          error?.status === 401
        ) {
          this.errorMessage =
            'Invalid email or password.';
          return;
        }

        if (
          error?.status === 403
        ) {
          this.errorMessage =
            'Your account is not allowed to sign in.';
          return;
        }

        if (
          error?.status === 429
        ) {
          this.errorMessage =
            'Too many login attempts. Please try again later.';
          return;
        }

        this.errorMessage =
          'Unable to connect to the server. Please try again.';
      }

    });
  }
}