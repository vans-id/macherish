import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

import { AuthService } from "./../auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(
      form.value.name,
      form.value.email,
      form.value.password
    );
  }
}
