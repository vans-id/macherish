import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [AngularMaterialModule, CommonModule, FormsModule],
})
export class AuthModule {}
