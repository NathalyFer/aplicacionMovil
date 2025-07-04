import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let navCtrlSpy: jasmine.SpyObj<Router>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async() => {
    navCtrlSpy = jasmine.createSpyObj('Router', ['navigate']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: Router, useValue: navCtrlSpy },
        { provide: AlertController, useValue: alertControllerSpy }
      ]
    }).compileComponents();

    // Create the component fixture
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería mostrar una alerta si username o password están vacíos', async () => {
    component.username = '';
    component.password = '';
    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Alerta',
      message: 'Por favor, complete todos los campos.',
      buttons: ['OK']
    });
  });

  it('debería mostrar una alerta si el username tiene menos de 3 o más de 8 caracteres', async () => {
    component.username = 'ab';
    component.password = '1234';
    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Alerta',
      message: 'El usuario debe tener entre 3 y 8 caracteres.',
      buttons: ['OK']
    });
  });

  it('debería mostrar una alerta si la contraseña no tiene 4 caracteres', async () => {
    component.username = 'usuario';
    component.password = '123';
    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Alerta',
      message: 'La contraseña debe tener 4 caracteres.',
      buttons: ['OK']
    });
  });

  it('debería navegar a la página de home si las credenciales son válidas', async () => {
    component.username = 'usuario';
    component.password = '1234';
    await component.login();
    expect(navCtrlSpy.navigate).toHaveBeenCalledWith(['/home'], {
      queryParams: { username: 'usuario', password: '1234' }
    });
  });

  it('debería navegar a la página de home con los parámetros correctos', async () => {
    component.username = 'usuario';
    component.password = '1234';
    await component.login();
      expect(navCtrlSpy.navigate).toHaveBeenCalledWith(['/home'], {
        queryParams: { username: 'usuario', password: '1234' }
      });
    });
  
    it('debería navegar a /registrarse', () => {
      component.registrarse();
      expect(navCtrlSpy.navigate).toHaveBeenCalledWith(['/registrarse']);
    });

    it('deberría navegar a /recuperar', () => {
      component.recuperar();
      expect(navCtrlSpy.navigate).toHaveBeenCalledWith(['/recuperar']);
    });
  });
