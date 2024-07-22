import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('Criar a instancia do servico', async () => {
    expect(service).toBeTruthy();
  });

  it('Se na instancia do loginService existe o método login', async () => {
    expect(service.login).toBeTruthy();
  });

  it('Verifica a utilização do localStorage para os tokens de login da aplicação', async () => {
    // AAA = métodologia

    // Arrange
    const token = "teste123456";
    LoginService.setLocalStorage(token);

    // Act
    const tokenCadastrado = LoginService.getToken(false);

    // Assert
    expect(tokenCadastrado).toBe(token);
  });


  it('token já expirado para o método getToken', () => {
    // Arrange
    const token = 'test-token';
    const now = new Date();
    const item = {
      value: token,
      expiry: now.getTime() - 1000 // Já expirado
    };
    localStorage.setItem('DesafioFrontAngularLoginToken', JSON.stringify(item));

    // Act
    const tokenCadastrado = LoginService.getToken(false);

    // Assert
    expect(tokenCadastrado).toBe('');
  });

  it('token já expirado para o método tokenValido', () => {
    // Arrange
    const token = 'test-token';
    const now = new Date();
    const item = {
      value: token,
      expiry: now.getTime() - 1000 // Já expirado
    };
    localStorage.setItem('DesafioFrontAngularLoginToken', JSON.stringify(item));

    // Act
    const tokenValidado = LoginService.tokenValido(false)

    // Assert
    expect(tokenValidado).not.toBeTruthy()
  });

  it('token não expirado para o método tokenValido', () => {
    // Arrange
    const token = 'test-token';
    const now = new Date();
    const item = {
      value: token,
      expiry: now.getTime() + 1000
    };
    localStorage.setItem('DesafioFrontAngularLoginToken', JSON.stringify(item));

    // Act
    const tokenValidado = LoginService.tokenValido(false)
    // Assert
    expect(tokenValidado).toBeTruthy()
  });

  it('token expirado pelo método clearLocalStorage', () => {
    // Arrange
    const token = "teste123456";
    LoginService.setLocalStorage(token);

    // Act
    LoginService.clearLocalStorage();
    const tokenValidado = LoginService.tokenValido(false)

    // Assert
    expect(tokenValidado).not.toBeTruthy()
  });
});
