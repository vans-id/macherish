import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { authData } from "./auth-data.model";
import { environment } from "src/environments/environment";

const BACKEND_URL = `${environment.apiUrl}/user`;

@Injectable({ providedIn: "root" })
export class AuthService {
  private username: string;
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private usernameStatusListener = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUsername() {
    return this.username;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsernameStatusListener() {
    return this.usernameStatusListener.asObservable();
  }

  createUser(name: string, email: string, password: string) {
    const registerData: any = { name, email, password };

    this.http.post(`${BACKEND_URL}/signup`, registerData).subscribe(
      () => {
        this.router.navigate["/"];
      },
      (error) => {
        this.authStatusListener.next(false);
      }
    );
  }

  login(email: string, password: string) {
    const authData: authData = { email, password };
    this.http
      .post<{ name: string; token: string; expiresIn: number; userId: string }>(
        `${BACKEND_URL}/login`,
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;

          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);

            this.isAuthenticated = true;
            this.authStatusListener.next(true);

            this.userId = response.userId;
            this.username = response.name;
            this.usernameStatusListener.next(response.name);

            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(
              token,
              expirationDate,
              this.userId,
              this.username
            );

            this.router.navigate(["/"]);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.username = authInformation.username;
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next(false);
    this.usernameStatusListener.next("");
    this.router.navigate(["/"]);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration: number) {
    console.log(`Time remains : ${duration}`);

    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    username: string
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    if (!token || !expirationDate) {
      return;
    }

    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
      username,
    };
  }
}
