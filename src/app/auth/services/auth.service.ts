import { computed, inject, Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environments";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError, map, Observable, of, throwError } from "rxjs";

import {
  CheckTokenResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from "../interfaces";
import { AuthStatus } from "../enums";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.Checking);

  currentUser = computed(() => this._currentUser());
  authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.Authenticated);
    localStorage.setItem("token", token);

    return true;
  }

  login({ email, password }: LoginRequest): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((error: HttpErrorResponse) =>
        throwError(() => error.error.message)
      )
    );
  }

  register({ name, email, password }: RegisterRequest): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const body = { name, email, password };

    return this.http.post<RegisterResponse>(url, body).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((error: HttpErrorResponse) =>
        throwError(() => error.error.message)
      )
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem("token");

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ token, user }) => this.setAuthentication(user, token)),
      catchError(() => {
        this._authStatus.set(AuthStatus.NotAuthenticated);
        return of(false);
      })
    );
  }

  logout(): void {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.NotAuthenticated);
    localStorage.removeItem("token");
  }
}
