import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter() {
					return localStorage.getItem('token');
				}
			}
		})
	],
	providers: [
		AuthService,
		JwtHelperService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	],
	exports: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
