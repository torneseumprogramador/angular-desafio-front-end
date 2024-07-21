import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Login } from '../../models/login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mensagemDeErro: string = "";
  loginForm: FormGroup;

  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('senhaInput') senhaInput!: ElementRef;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.mensagemDeErro = "";
    
    if (this.loginForm.invalid) {
      this.mensagemDeErro = "Por favor, preencha todos os campos obrigatórios que estão com *.";
      
      for (const key of Object.keys(this.loginForm.controls)) {
        if (this.loginForm.get(key)?.invalid) {
          switch (key) {
            case 'email':
              this.emailInput.nativeElement.focus();
              break;
            case 'senha':
              this.senhaInput.nativeElement.focus();
              break;
          }
          break;
        }
      }
      
      return;
    }

    const email = this.loginForm.get("email")?.value;
    const senha = this.loginForm.get("senha")?.value;
    try{
      const login: Login = await this.loginService.login(email, senha);
      LoginService.setLocalStorage(login.token);
      this.router.navigate(['/']);
    }
    catch(e: any){
      this.mensagemDeErro = e.error;
    }
  }
}
