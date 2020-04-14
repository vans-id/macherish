import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { authData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: authData = { email, password };

    this.http
      .post("http://localhost:5000/api/user/signup", authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: authData = { email, password };
    this.http
      .post("http://localhost:5000/api/user/login", authData)
      .subscribe((response) => console.log(response));
  }
}
